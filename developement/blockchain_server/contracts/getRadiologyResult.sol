// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileStorage {
    enum FileType { Record, LabResult, RadiologyResult, OtherResult }

    struct File {
        string ipfsHash;
        string fileName;
        FileType fileType;
    }

    mapping(address => File[]) private userFiles;

    function uploadFile(string memory _ipfsHash, string memory _fileName, FileType _fileType) public {
        File memory newFile = File(_ipfsHash, _fileName, _fileType);
        userFiles[msg.sender].push(newFile);
    }

    function getFiles() public view returns (File[] memory) {
        return userFiles[msg.sender];
    }
}
