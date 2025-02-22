import { generateTemplateClassesFromXSD } from 'xsd2ts'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
//import.meta.filename
const currentFile = fileURLToPath(import.meta.url)
const scriptDir = path.dirname(currentFile)
const resourcesDir = path.join(scriptDir, '_resources')

const xsdFile1 = path.join(
	resourcesDir,
	'Factur-X_1.07.2_BASIC_urn_un_unece_uncefact_data_standard_QualifiedDataType_100.xsd',
)
generateTemplateClassesFromXSD(xsdFile1.replace(/\\/g, '/'))

const xsdFile2 = path.join(
	resourcesDir,
	'Factur-X_1.07.2_BASIC_urn_un_unece_uncefact_data_standard_UnqualifiedDataType_100.xsd',
)
generateTemplateClassesFromXSD(xsdFile2.replace(/\\/g, '/'))

const depMap1 = new Map<string, string>(
	[[
		'urn:un:unece:uncefact:data:standard:QualifiedDataType:100',
		xsdFile1.replace(/\\/g, '/'),
	], [
		'urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100',
		xsdFile2.replace(/\\/g, '/'),
	]],
)
const xsdFile3 = path.join(
	resourcesDir,
	'Factur-X_1.07.2_BASIC_urn_un_unece_uncefact_data_standard_ReusableAggregateBusinessInformationEntity_100.xsd',
)
generateTemplateClassesFromXSD(
	xsdFile3.replace(/\\/g, '/'),
	depMap1,
)

const depMap2 = new Map<string, string>(
	[[
		'urn:un:unece:uncefact:data:standard:QualifiedDataType:100',
		xsdFile1.replace(/\\/g, '/'),
	], [
		'urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100',
		xsdFile2.replace(/\\/g, '/'),
	], [
		'urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100',
		xsdFile3.replace(/\\/g, '/'),
	]],
)
const xsdFile4 = path.join(
	resourcesDir,
	'Factur-X_1.07.2_BASIC.xsd',
)
generateTemplateClassesFromXSD(
	xsdFile4.replace(/\\/g, '/'),
	depMap2,
)
// generateTemplateClassesFromXSD(
//     './Factur-X_1.07.2_BASIC.xsd', {
//         libname, './dependency'});
//generateTemplateClassesFromXSD('./yourXsdFile.xsd', {libname, './dependency'});
