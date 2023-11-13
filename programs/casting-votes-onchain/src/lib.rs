use anchor_lang::prelude::*;

declare_id!("7vnKReNaiPPFLVtFKWp2qip77TFct3ZqJbbsdpXm8Pji");

#[program]
pub mod casting_votes_onchain {
    use super::*;

    pub fn cast_vote(
        ctx: Context<CastingVote>,
        poll_id: String,
        user_id: String,
        time_lock_encrypted_vote: String,
        amount: u64
    ) -> Result<()> {
        let votes = &mut ctx.accounts.votes;
        votes.poll_id = poll_id;
        votes.user_id = user_id;
        votes.voter = *ctx.accounts.voter.key;
        votes.timelock_encrypted_vote = time_lock_encrypted_vote;
        votes.amount = amount;
        votes.bump = ctx.bumps.votes;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(poll_id: String, user_id:String)]
pub struct CastingVote<'info> {
    #[account(mut)]
    pub voter: Signer<'info>,
    #[account(
        init,
        payer = voter,
        space = Votes::size(),
        seeds = ["votes".as_bytes(), poll_id.as_bytes(), user_id.as_bytes()],
        bump
    )]
    pub votes: Account<'info, Votes>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Votes {
    pub poll_id: String, // poll id
    pub user_id: String, // user id
    pub voter: Pubkey, // voter's address
    pub timelock_encrypted_vote: String, // timelock encrypted vote
    pub amount: u64, // stake amount
    pub bump: u8, // bump seed
}

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const STRING_LENGTH_PREFIX: usize = 4;
const MAX_POLL_ID_LENGTH: usize = 280 * 4; // 280 chars max.
const MAX_USER_ID_LENGTH: usize = 280 * 4; // 280 chars max.
const MAX_VOTE_LENGTH: usize = 280 * 4; // 280 chars max.
const U_64_LENGTH: usize = 8;
const U_8_LENGTH: usize = 1;

impl Votes {
    fn size() -> usize {
        DISCRIMINATOR_LENGTH + // account discriminator
            (STRING_LENGTH_PREFIX + MAX_POLL_ID_LENGTH) + // poll id
            (STRING_LENGTH_PREFIX + MAX_USER_ID_LENGTH) + // user id
            PUBLIC_KEY_LENGTH + // voter's address
            (STRING_LENGTH_PREFIX + MAX_VOTE_LENGTH) + // timelock encrypted vote
            U_64_LENGTH + // stake amount
            U_8_LENGTH // bump seed
    }
}
