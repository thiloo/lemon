pragma solidity ^0.4.6;

// Simple Product Details

/*
    Public Variables:
        address owner / ownership is transferable, current owner
        address producer / initially = owner,
        string name / product title
        string description / general description of product
        uint date / Creation date of product
        uint count / how many units of the good produced
        string unit / the unit of the count
        Infos[] infos / takes structs of info sections e.g. strain, harvest date etc. The array can later receive further info sections like THC Test results
        Editors[] editors / takes list of addresses able to edit contract

    Functions:
        Add to Infos / Add Information to the Infos Array, in form of structs
        Tokens / Generate tokens based on count
        Transfer Ownership / transfer ownership of the contract only possible if future owner gets all count
        Transfer Tokens / If part of count is transfered, should be done with tokens. Info editor rights to be clarified. Should onwer of tokens receive those?

    Structs:
        Infofields /

*/

contract SimpleProduct {
    struct Infos {
        address author;
        string infos;
    }

    struct Editors {
        address editor;
    }

    address public producer;
    address public owner;
    string public name;
    string public description;
    uint public date;
    uint public count;
    string public unit;
    Infos[] public infos;
    Editors[] public editors;

    function SimpleProduct(
        string pName,
        string pDescription,
        uint pDate,
        uint pCount,
        string pUnit
        ) {
        producer = msg.sender;
        owner = msg.sender;
        name = pName;
        description = pDescription;
        date = pDate;
        count = pCount;
        unit = pUnit;
    }
}
