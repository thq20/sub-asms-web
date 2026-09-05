const assert = require('node:assert/strict');
process.env.TS_NODE_COMPILER_OPTIONS = JSON.stringify({ module: 'CommonJS', moduleResolution: 'node', jsx: 'react-jsx' });
require('ts-node/register/transpile-only');
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.invalid';
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = 'test-key';
const { dataApiCall } = require('../src/lib/supabaseBrowser');
const { renderToStaticMarkup } = require('react-dom/server');
const React = require('react');
const { SettingsPanel } = require('../src/components/SettingsPanel');

async function run() {
  const floors = [3, 4, 5].map(n => ({ id: `floor-${n}`, type: 'FLOOR', name: `Tầng ${n}`, active: true }));
  let rows, used, calls;
  function reset() { rows = [...floors.map(x => ({ ...x })), { id: 'owner-1', type: 'OWNER', name: 'Store', active: true }]; used = false; calls = []; }
  global.fetch = async (url, init = {}) => {
    const parsed = new URL(url), p = parsed.searchParams;
    calls.push({ url, init });
    if (parsed.pathname.endsWith('/Asset')) return Response.json(used ? [{ id: 'asset-1' }] : []);
    assert.ok(parsed.pathname.endsWith('/MasterData'));
    if (init.method === 'PATCH') {
      assert.deepEqual(JSON.parse(init.body).active, false);
      const ids = JSON.parse('[' + p.get('id').slice(4, -1) + ']');
      rows = rows.map(row => ids.includes(row.id) ? { ...row, active: false } : row);
      return new Response(null, { status: 204 });
    }
    return Response.json(rows.filter(row => (!p.has('type') || p.get('type') === `eq.${row.type}`) && (!p.has('id') || p.get('id') === `eq.${row.id}`) && (!p.has('active') || row.active)));
  };
  reset();
  assert.equal((await dataApiCall('/api/master-data?type=FLOOR&all=true', { method: 'DELETE' })).removed, 3);
  assert.equal(rows.filter(row => row.type === 'FLOOR' && row.active).length, 0);
  assert.equal(rows.find(row => row.type === 'OWNER').active, true);
  const patches = calls.filter(c => c.init.method === 'PATCH');
  assert.equal(patches.length, 1);
  assert.equal(new URL(patches[0].url).searchParams.get('type'), 'eq.FLOOR');
  assert.equal((await dataApiCall('/api/master-data?type=FLOOR&all=true', { method: 'DELETE' })).removed, 0);
  reset(); used = true;
  await assert.rejects(dataApiCall('/api/master-data?type=FLOOR&all=true', { method: 'DELETE' }), /đang được tài sản sử dụng/);
  assert.equal(calls.filter(c => c.init.method === 'PATCH').length, 0);
  reset();
  await dataApiCall('/api/master-data?id=floor-4', { method: 'DELETE' });
  assert.equal(rows.find(row => row.id === 'floor-3').active, true);
  assert.equal(rows.find(row => row.id === 'floor-4').active, false);
  await assert.rejects(dataApiCall('/api/master-data?all=true', { method: 'DELETE' }), /Chọn mục/);
  const html = renderToStaticMarkup(React.createElement(SettingsPanel, { open: true, onClose() {} }));
  assert.match(html, /<b>Floor<\/b>/);
  assert.match(html, /Chưa có dữ liệu/);
  assert.match(html, /Xóa toàn bộ dữ liệu trong mục Floor/);
  assert.doesNotMatch(html, /Xóa cả mục/);
  console.log('PASS: clear category contents; preserve other categories; empty retry; protect used values; single delete; require scope; retain empty Floor in Settings.');
}
run().catch(error => { console.error(error); process.exitCode = 1; });
