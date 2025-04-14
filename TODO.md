

add warnings and errors for missing paths and failed renders
add error check for files of same name within in current files groups

fix output file name default when using filesfiles
during default prep the outfilename is given a default
this gets used in filesfiles and always resolves to true since a default is given
this does not allow custom file output names for multiple files


add mirror structure for folder

mirrorfolder
this will create a copy of the folder structure will all of the files converted

rename dir to folders
test all inputStructures 
test install of repo as package

add to and from for options
list resource path as array and convert for pandoc


TODO LOW PRIORITY

how to use urls with files inputStructure 

destructure prep

should use naming that embeds "/" or "\" as platform specific separators
names should be joined as path, 
applies to input files/folders and output files and folders
separate "/" then rejoin to make compatbile with platform 
