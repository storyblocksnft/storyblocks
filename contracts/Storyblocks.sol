// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "base64-sol/base64.sol";

import "hardhat/console.sol";

/**
 * @title Storyblocks One Word Story Contract
 * @dev Extends ERC721 Non-Fungible Token Standard basic implementation
 */
contract Storyblocks is ERC721 {
    /// ============ Types ============

    // Support three types of punctuation
    enum Punctuation {
        None,
        Period,
        Comma,
        Colon
    }

    struct TokenMetadata {
        uint256 updatedAt;
        uint256 funded;
        uint256 withdrawn;
        Punctuation punctuation;
    }

    /// ============ Immutable storage ============

    uint256 public immutable basePrice = 10e18; // 10 MATIC
    bytes32 public immutable merkleRoot =
        0x58c552e31fd47219306108e80aa3f71bbb1cbb949c60c0418ee69c9572067571;
    uint256 public immutable minWordChangeDelay = 172800; // 2 days

    /// ============ Mutable storage ============

    string[] public words;
    mapping(uint256 => TokenMetadata) public tokenMetadata;

    constructor() ERC721("Storyblock", "SBLOCK") {}

    /// ============ Functions ============

    /// @notice Mint a new word in the story
    /// @param word Word to mint
    function mint(
        string calldata word,
        Punctuation punctuation,
        bytes32[] calldata proof
    ) public payable returns (uint256) {
        // Ensure payment of at least current mint price
        require(
            currentPriceToMint() <= msg.value,
            "Cannot mint for below mint price."
        );

        // Ensure word is valid
        validateWord(word, proof);

        // Ensure punctuation is valid
        require(
            (punctuation == Punctuation.None ||
                punctuation == Punctuation.Period) ||
                (punctuation == Punctuation.Colon ||
                    punctuation == Punctuation.Comma),
            "Invalid punctuation."
        );

        // Add word
        uint256 mintIndex = words.length;
        words.push(word);

        // Mint to user
        _safeMint(msg.sender, mintIndex);

        // Update metadata
        tokenMetadata[mintIndex] = TokenMetadata({
            updatedAt: block.timestamp,
            funded: msg.value,
            withdrawn: 0,
            punctuation: punctuation
        });

        return mintIndex;
    }

    function changeWord(
        uint256 tokenId,
        string calldata word,
        Punctuation punctuation,
        bytes32[] calldata proof
    ) public payable {
        // Ensure payment for word change recieved
        require(
            currentPriceToMint() <= msg.value,
            "Cannot change word for below current mint price."
        );

        // Ensure tokenId is valid
        validateTokenId(tokenId);

        // Ensure word is valid
        validateWord(word, proof);

        // Ensure sender is token owner
        require(
            ownerOf(tokenId) == msg.sender,
            "Must own token to change word."
        );

        TokenMetadata storage metadata = tokenMetadata[tokenId];

        // Ensure enough time has passed
        require(
            (block.timestamp - metadata.updatedAt) >= minWordChangeDelay,
            "Too soon to change word."
        );

        // Change word and add funding
        words[tokenId] = word;
        metadata.punctuation = punctuation;
        metadata.updatedAt = block.timestamp;
        metadata.funded += msg.value;
    }

    /// @notice Claim rewards from a certain token
    /// @param tokenId Id of token to claim rewards from
    function withdraw(uint256 tokenId, uint256 amount) public {
        uint256 balance = balanceOfToken(tokenId);

        // Ensure not withdrawing more than balance
        require(balance >= amount, "Attempt to withdraw more than balance");

        // Ensure only owner can withdraw
        require(
            ownerOf(tokenId) == msg.sender,
            "Unauthorized attempt to withdraw"
        );

        // Update withdrawn amount
        tokenMetadata[tokenId].withdrawn += amount;

        // Pay amount to sender
        payable(msg.sender).transfer(amount);
    }

    function validateWord(string calldata word, bytes32[] calldata proof) private pure {
        // Verify merkle proof, or revert if not in tree
        bytes32 leaf = keccak256(abi.encodePacked(word));
        require(MerkleProof.verify(proof, merkleRoot, leaf), "Invalid word.");
    }

    /// ============ Utilities ============

    /// @notice Get current mint price
    function currentPriceToMint() public view returns (uint256) {
        return basePrice * ((words.length / 10) + 1);
    }

    function validateTokenId(uint256 tokenId) private view {
        require(_exists(tokenId) && tokenId < words.length, "Invalid tokenId.");
    }

    /// @notice Get rewards claimable by token holder
    /// @param tokenId Id of token to check
    function balanceOfToken(uint256 tokenId) public view returns (uint256) {
        require(_exists(tokenId), "Token does not exist.");

        uint256 balance = 0;

        for (uint256 i = tokenId; i < words.length; i++) {
            balance += (tokenMetadata[i].funded / (i + 1));
        }

        return balance - tokenMetadata[tokenId].withdrawn;
    }

    /// @notice Get total rewards
    function totalFunded() public view returns (uint256) {
        uint256 total = 0;

        for (uint256 i = 0; i < words.length; i++) {
            total += tokenMetadata[i].funded;
        }

        return total;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(tokenId), "Token does not exist.");

        require((tokenId < words.length), "Invalid tokenId.");

        string memory word = words[tokenId];

        string memory json = Base64.encode(
            abi.encodePacked(
                '{"name":"Storyblock #',
                Strings.toString(tokenId),
                '","image":https://www.storyblocks.cc/data/"',
                word,
                '.svg"}'
            )
        );
        string memory jsonUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return jsonUri;
    }

    /// @notice Get number of words
    function wordCount() public view returns (uint256) {
        return words.length;
    }
}
