import { expect } from "chai";
import { Contract, BigNumber, Signer } from "ethers";
import hre, { ethers } from "hardhat";
import { parseEther } from "ethers/lib/utils";
import { increaseTime } from "../utils/utilities";

describe("Vault Token", function () {
  let signers: Signer[];

  let testTokenInstance: Contract;
  let vaultToken: Contract;

  let owner: any;
  let user: any;
  let user2: any;

  before(async () => {
    signers = await ethers.getSigners();

    hre.tracer.nameTags[await signers[0].getAddress()] = "ADMIN";
    hre.tracer.nameTags[await signers[1].getAddress()] = "USER1";

    owner = signers[0];
    user = signers[1];
    user2 = signers[2];

    const USDC = await ethers.getContractFactory("USDC", owner);
    testTokenInstance = await USDC.deploy("USDC","USD");

    const VaultToken = await ethers.getContractFactory("TokenVault",owner);
    vaultToken = await VaultToken.deploy(testTokenInstance.address,"AUSDC","ASD");
  });

  it("Functions", async function () {

    console.log(testTokenInstance.functions);
    console.log(testTokenInstance.address);

    console.log(vaultToken.functions);
    console.log(owner.address);
  });


  it("Mint Token", async function () {
    await  testTokenInstance.connect(owner).mint(parseEther("10000"));

    await testTokenInstance.connect(owner).approve(vaultToken.address,parseEther("10000"));

    await vaultToken.connect(owner)._deposit(parseEther("130"))


    increaseTime(100000000);

    await vaultToken.connect(owner)._withdraw(parseEther("110"),owner.address)

  });

  
});
