import { expect } from "chai";
import { viem } from "hardhat";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";
import type { Kudos$Type } from "../artifacts/contracts/Kudos.sol/Kudos";

describe("Kudos", function () {
  let kudos: GetContractReturnType<Kudos$Type["abi"]>;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    [owner, addr1, addr2] = await viem.getWalletClients();
    const Kudos = await viem.deployContract("Kudos");
    kudos = Kudos;
  });

  describe("sendKudo", function () {
    it("Should send a kudo successfully", async function () {
      const message = "Great work!";
      const tx = await kudos.write.sendKudo(
        [
          {
            to: addr2.account.address,
            message: message,
          },
        ],
        { account: addr1.account }
      );

      // Verify kudo was stored
      const sentKudos = await kudos.read.getKudosSent(
        [{ page: 0n, pageSize: 10n }],
        { account: addr1.account }
      );
      if (!sentKudos?.kudos?.[0]) throw new Error("No kudos returned");
      expect(sentKudos.kudos.length).to.equal(1);
      expect(sentKudos.kudos[0].from.toLowerCase()).to.equal(
        addr1.account.address.toLowerCase()
      );
      expect(sentKudos.kudos[0].to.toLowerCase()).to.equal(
        addr2.account.address.toLowerCase()
      );
      expect(sentKudos.kudos[0].message).to.equal(message);
    });

    it("Should not allow sending kudo to zero address", async function () {
      await expect(
        kudos.write.sendKudo(
          [
            {
              to: "0x0000000000000000000000000000000000000000",
              message: "Test message",
            },
          ],
          { account: addr1.account }
        )
      ).to.be.rejectedWith("Cannot send to zero address");
    });

    it("Should not allow sending kudo to self", async function () {
      await expect(
        kudos.write.sendKudo(
          [
            {
              to: addr1.account.address,
              message: "Test message",
            },
          ],
          { account: addr1.account }
        )
      ).to.be.rejectedWith("Cannot send kudos to yourself");
    });
  });

  describe("getKudosSent", function () {
    it("Should return paginated sent kudos", async function () {
      // Send multiple kudos
      for (let i = 0; i < 3; i++) {
        await kudos.write.sendKudo(
          [
            {
              to: addr2.account.address,
              message: `Message ${i}`,
            },
          ],
          { account: addr1.account }
        );
      }

      // Get first page
      const page1 = await kudos.read.getKudosSent(
        [{ page: 0n, pageSize: 2n }],
        { account: addr1.account }
      );
      if (!page1?.kudos?.[0]) throw new Error("No kudos returned");
      expect(page1.kudos.length).to.equal(2);
      expect(page1.currentPage).to.equal(0n);
      expect(page1.totalPages).to.equal(2n);
      expect(page1.totalItems).to.equal(3n);

      // Get second page
      const page2 = await kudos.read.getKudosSent(
        [{ page: 1n, pageSize: 2n }],
        { account: addr1.account }
      );
      if (!page2 || !page2.kudos || !page2.kudos[0])
        throw new Error("No kudos returned");
      expect(page2.kudos.length).to.equal(1);
      expect(page2.currentPage).to.equal(1n);
      expect(page2.totalPages).to.equal(2n);
      expect(page2.totalItems).to.equal(3n);
    });

    it("Should handle empty results", async function () {
      const result = await kudos.read.getKudosSent(
        [{ page: 0n, pageSize: 10n }],
        { account: addr1.account }
      );
      if (!result?.kudos) throw new Error("No kudos returned");
      expect(result.kudos.length).to.equal(0);
      expect(result.totalItems).to.equal(0n);
      expect(result.totalPages).to.equal(0n);
    });
  });

  describe("getKudosReceived", function () {
    it("Should return paginated received kudos", async function () {
      // Send multiple kudos to addr2
      for (let i = 0; i < 3; i++) {
        await kudos.write.sendKudo(
          [
            {
              to: addr2.account.address,
              message: `Message ${i}`,
            },
          ],
          { account: addr1.account }
        );
      }

      // Get received kudos for addr2
      const result = await kudos.read.getKudosReceived(
        [{ page: 0n, pageSize: 10n }],
        { account: addr2.account }
      );

      expect(result.kudos.length).to.equal(3);
      expect(result.totalItems).to.equal(3n);
      expect(result?.kudos?.[0]?.from.toLowerCase()).to.equal(
        addr1.account.address.toLowerCase()
      );
      expect(result?.kudos?.[0]?.to.toLowerCase()).to.equal(
        addr2.account.address.toLowerCase()
      );
    });
  });

  describe("getKudosCount", function () {
    it("Should return correct counts", async function () {
      // Send 2 kudos from addr1 to addr2
      await kudos.write.sendKudo(
        [
          {
            to: addr2.account.address,
            message: "Message 1",
          },
        ],
        { account: addr1.account }
      );
      await kudos.write.sendKudo(
        [
          {
            to: addr2.account.address,
            message: "Message 2",
          },
        ],
        { account: addr1.account }
      );

      // Send 1 kudo from addr2 to addr1
      await kudos.write.sendKudo(
        [
          {
            to: addr1.account.address,
            message: "Message 3",
          },
        ],
        { account: addr2.account }
      );

      // Check counts
      const addr1SentCount = await kudos.read.getKudosSentCount({
        account: addr1.account,
      });
      const addr1ReceivedCount = await kudos.read.getKudosReceivedCount({
        account: addr1.account,
      });
      const addr2SentCount = await kudos.read.getKudosSentCount({
        account: addr2.account,
      });
      const addr2ReceivedCount = await kudos.read.getKudosReceivedCount({
        account: addr2.account,
      });

      expect(addr1SentCount).to.equal(2n);
      expect(addr1ReceivedCount).to.equal(1n);
      expect(addr2SentCount).to.equal(1n);
      expect(addr2ReceivedCount).to.equal(2n);
    });
  });
});
