import { readFileSync } from "fs";
import { resolve } from "path";
import { PrismaClient, MasterDataType } from "../src/generated/prisma"; const prisma=new PrismaClient();
for (const line of readFileSync(resolve(process.cwd(), ".env"), "utf8").split(/\r?\n/)) {
  const match = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*["']?(.*?)["']?\s*$/);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
}
async function main(){for(const [type,names] of Object.entries({LOCATION:["Kho IT","Tòa A","Tòa B"],FLOOR:["Tầng 1","Tầng 3","Tầng 5"],OWNER:["Store","Nguyễn Văn An","Trần Minh Anh"],PURCHASING_UNIT:["Store","IT Operations"]}))for(const name of names)await prisma.masterData.upsert({where:{type_name:{type:type as MasterDataType,name}},update:{active:true},create:{type:type as MasterDataType,name}});console.log("Sub-ASMS master data seeded.");}main().finally(()=>prisma.$disconnect());
