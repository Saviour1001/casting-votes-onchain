import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CastingVotesOnchain } from "../target/types/casting_votes_onchain";
import { assert } from "chai";

describe("casting-votes-onchain", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace
    .CastingVotesOnchain as Program<CastingVotesOnchain>;

  it("Casting on Poll 1 with User 1", async () => {
    // declaring the constants
    const pollId = "poll_id_1";
    const userId = "user_id_1";
    const vote = "timelock_encrypted_vote_1";
    const amount = new anchor.BN(100);

    // fetching the Program Derived Address (PDA) using the seeds

    const [newVotePDA, bump] =
      await anchor.web3.PublicKey.findProgramAddressSync(
        [
          anchor.utils.bytes.utf8.encode("votes"),
          anchor.utils.bytes.utf8.encode(pollId),
          anchor.utils.bytes.utf8.encode(userId),
        ],
        program.programId
      );

    // console.log("Voter PDA is ", newVotePDA.toString());

    // casting the vote

    const tx = await program.methods
      .castVote(pollId, userId, vote, amount)
      .accounts({
        // Signer is already passed in by the provider.
        votes: newVotePDA,
      })
      .rpc();

    // fetching the vote account

    const voteAccount = await program.account.votes.fetch(newVotePDA);

    // asserting the vote account

    assert.ok(voteAccount.pollId === pollId);
    assert.ok(voteAccount.userId === userId);
    assert.ok(voteAccount.timelockEncryptedVote === vote);
    assert.ok(voteAccount.amount.eq(amount));
  });

  it("Casting on Poll 1 with User 2", async () => {
    // declaring the constants
    const pollId = "poll_id_1";
    const userId = "user_id_2";
    const vote = "timelock_encrypted_vote_2";
    const amount = new anchor.BN(200);

    // fetching the Program Derived Address (PDA) using the seeds

    const [newVotePDA, bump] =
      await anchor.web3.PublicKey.findProgramAddressSync(
        [
          anchor.utils.bytes.utf8.encode("votes"),
          anchor.utils.bytes.utf8.encode(pollId),
          anchor.utils.bytes.utf8.encode(userId),
        ],
        program.programId
      );

    // console.log("Voter PDA is ", newVotePDA.toString());

    // casting the vote

    const tx = await program.methods
      .castVote(pollId, userId, vote, amount)
      .accounts({
        // Signer is already passed in by the provider.
        votes: newVotePDA,
      })
      .rpc();

    // fetching the vote account

    const voteAccount = await program.account.votes.fetch(newVotePDA);

    // asserting the vote account

    assert.ok(voteAccount.pollId === pollId);
    assert.ok(voteAccount.userId === userId);
    assert.ok(voteAccount.timelockEncryptedVote === vote);
    assert.ok(voteAccount.amount.eq(amount));
  });

  it("Casting on Poll 2 with User 1", async () => {
    // declaring the constants
    const pollId = "poll_id_2";
    const userId = "user_id_1";
    const vote = "timelock_encrypted_vote_3";
    const amount = new anchor.BN(300);

    // fetching the Program Derived Address (PDA) using the seeds

    const [newVotePDA, bump] =
      await anchor.web3.PublicKey.findProgramAddressSync(
        [
          anchor.utils.bytes.utf8.encode("votes"),
          anchor.utils.bytes.utf8.encode(pollId),
          anchor.utils.bytes.utf8.encode(userId),
        ],
        program.programId
      );

    // console.log("Voter PDA is ", newVotePDA.toString());

    // casting the vote

    const tx = await program.methods
      .castVote(pollId, userId, vote, amount)
      .accounts({
        // Signer is already passed in by the provider.
        votes: newVotePDA,
      })
      .rpc();

    // fetching the vote account

    const voteAccount = await program.account.votes.fetch(newVotePDA);

    // asserting the vote account

    assert.ok(voteAccount.pollId === pollId);
    assert.ok(voteAccount.userId === userId);
    assert.ok(voteAccount.timelockEncryptedVote === vote);
    assert.ok(voteAccount.amount.eq(amount));
  });

  it("Casting on Poll 2 with User 2", async () => {
    // declaring the constants

    const pollId = "poll_id_2";
    const userId = "user_id_2";
    const vote = "timelock_encrypted_vote_4";
    const amount = new anchor.BN(400);

    // fetching the Program Derived Address (PDA) using the seeds

    const [newVotePDA, bump] =
      await anchor.web3.PublicKey.findProgramAddressSync(
        [
          anchor.utils.bytes.utf8.encode("votes"),
          anchor.utils.bytes.utf8.encode(pollId),
          anchor.utils.bytes.utf8.encode(userId),
        ],
        program.programId
      );

    // console.log("Voter PDA is ", newVotePDA.toString());

    // casting the vote

    const tx = await program.methods
      .castVote(pollId, userId, vote, amount)
      .accounts({
        // Signer is already passed in by the provider.
        votes: newVotePDA,
      })
      .rpc();

    // fetching the vote account

    const voteAccount = await program.account.votes.fetch(newVotePDA);

    // asserting the vote account

    assert.ok(voteAccount.pollId === pollId);
    assert.ok(voteAccount.userId === userId);
    assert.ok(voteAccount.timelockEncryptedVote === vote);
    assert.ok(voteAccount.amount.eq(amount));
  });

  it("Fetching all the votes for Poll 1", async () => {
    // declaring the constants

    // for fetching vote account we just need the pollId and userId

    const pollId = "poll_id_1";
    const userId1 = "user_id_1";
    const userId2 = "user_id_2";

    // fetching the first vote account
    const [votePDA1, bump1] =
      await anchor.web3.PublicKey.findProgramAddressSync(
        [
          anchor.utils.bytes.utf8.encode("votes"),
          anchor.utils.bytes.utf8.encode(pollId),
          anchor.utils.bytes.utf8.encode(userId1),
        ],
        program.programId
      );

    // fetching the second vote account
    const [votePDA2, bump2] =
      await anchor.web3.PublicKey.findProgramAddressSync(
        [
          anchor.utils.bytes.utf8.encode("votes"),
          anchor.utils.bytes.utf8.encode(pollId),
          anchor.utils.bytes.utf8.encode(userId2),
        ],
        program.programId
      );

    // fetching the vote accounts

    const voteAccount1 = await program.account.votes.fetch(votePDA1);
    const voteAccount2 = await program.account.votes.fetch(votePDA2);

    // asserting the vote accounts

    // voteAccount1

    assert.ok(voteAccount1.pollId === pollId);
    assert.ok(voteAccount1.userId === userId1);
    assert.ok(
      voteAccount1.timelockEncryptedVote === "timelock_encrypted_vote_1"
    );
    assert.ok(voteAccount1.amount.eq(new anchor.BN(100)));

    // voteAccount2

    assert.ok(voteAccount2.pollId === pollId);
    assert.ok(voteAccount2.userId === userId2);
    assert.ok(
      voteAccount2.timelockEncryptedVote === "timelock_encrypted_vote_2"
    );
    assert.ok(voteAccount2.amount.eq(new anchor.BN(200)));
  });

  it("Fetching all the votes for Poll 2", async () => {
    // declaring the constants

    // for fetching vote account we just need the pollId and userId

    const pollId = "poll_id_2";
    const userId1 = "user_id_1";
    const userId2 = "user_id_2";

    // fetching the first vote account

    const [votePDA1, bump1] =
      await anchor.web3.PublicKey.findProgramAddressSync(
        [
          anchor.utils.bytes.utf8.encode("votes"),
          anchor.utils.bytes.utf8.encode(pollId),
          anchor.utils.bytes.utf8.encode(userId1),
        ],
        program.programId
      );

    // fetching the second vote account

    const [votePDA2, bump2] =
      await anchor.web3.PublicKey.findProgramAddressSync(
        [
          anchor.utils.bytes.utf8.encode("votes"),
          anchor.utils.bytes.utf8.encode(pollId),
          anchor.utils.bytes.utf8.encode(userId2),
        ],
        program.programId
      );

    // fetching the vote accounts

    const voteAccount1 = await program.account.votes.fetch(votePDA1);
    const voteAccount2 = await program.account.votes.fetch(votePDA2);

    // asserting the vote accounts

    // voteAccount1

    assert.ok(voteAccount1.pollId === pollId);
    assert.ok(voteAccount1.userId === userId1);
    assert.ok(
      voteAccount1.timelockEncryptedVote === "timelock_encrypted_vote_3"
    );
    assert.ok(voteAccount1.amount.eq(new anchor.BN(300)));

    // voteAccount2

    assert.ok(voteAccount2.pollId === pollId);
    assert.ok(voteAccount2.userId === userId2);
    assert.ok(
      voteAccount2.timelockEncryptedVote === "timelock_encrypted_vote_4"
    );
    assert.ok(voteAccount2.amount.eq(new anchor.BN(400)));
  });
});
