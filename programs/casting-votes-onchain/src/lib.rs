use anchor_lang::prelude::*;

declare_id!("7vnKReNaiPPFLVtFKWp2qip77TFct3ZqJbbsdpXm8Pji");

#[program]
pub mod casting_votes_onchain {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
