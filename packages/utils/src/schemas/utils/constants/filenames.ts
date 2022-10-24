const VALID = ['file-name', 'file_name', 'file.name'];

const INVALID = [
	'/',
	'\\',
	' ',
	' file-name',
	'file-name ',
	'file/name',
	'file\\name',
	'file:name',
	'file name',
	'file/name',
	'file%name',
	'file&name',
	'file*name',
	'file(name',
	'file)name',
	'file{name',
	'file}name',
	'file[name',
	'file]name',
	'file=name',
	'file+name',
	'file,name',
	'file;name',
	'file:name',
	'file@name',
	'file!name',
	'file#name',
	'file$name',
	'file^name',
	'file~name',
	'file`name',
	'file|name',
	'file\\name',
	"file'name",
	'file"name',
	'file<name',
	'file>name',
	'file?name',
	'file/name',
	'file%name',
	'file&name',
	'file*name',
	'file(name',
	'file)name',
	'file{name',
	'file}name',
	'file[name',
	'file]name',
	'file=name',
	'file+name',
	'file,name',
	'file;name',
	'file:name',
	'file@name',
	'file!name',
	'file#name',
	'file$name',
	'file^name',
	'file~name',
	'file`name',
	'file|name',
	'file\\name',
	"file'name",
	'file"name',
	'file<name',
	'file>name',
	'file?name',
	'file/name',
	'file%name',
	'file&name',
	'file*name',
	'file(name',
	'file)name',
	'file{name',
	'file}name',
	'file[name',
	'file]name',
	'file=name',
	'file+name',
	'file,name',
	'file;name',
	'file:name',
	'file@name',
	'file!name',
	'file#name',
	'file$name',
	'file^name',
	'file~name',
	'file`name',
	'file|name',
	'file\\name',
	"file'name",
	'file"name',
	'file<name',
	'file>name',
];

export const FILENAMES = {
	VALID,
	INVALID,
};