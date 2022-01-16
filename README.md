# Storyblocks
**An on-chain experiment in collaborative storytelling**

Verified contract: https://mumbai.polygonscan.com/address/0xf9f23b793d1c62bb7cb7a139a4e02033e920bfc7#code
Game: storyblocks.cc
Piñata IPFS data (example): https://gateway.pinata.cloud/ipfs/QmYZTijLabVGeHm1yGzVRZrVXLCGmcNYUApwsQ68tqRnYZ/above.svg

## What is this?
Storyblocks is a story told by everyone, one word at a time, on the blockchain. In the game:
- the price to mint a new word in the story goes up linearly over time
- every word holder is paid royalties from every word minted after them
	- this incentivizes people to choose words that continue the story
- words can be changed every two days
	- so, for example, you can sell your word to someone else and they can change it

This means that we can all tell a story together. And the story will change over time as people change their words.

Go play at: storyblocks.cc

## Misc Implementation Details
- OpenSea NFT docs used to structure contract
- words verified to be in set of allowed words through merkle proof
- set of allowed words is a small subset (~2000) of the most common English words


