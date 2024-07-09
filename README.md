# Hardhat Project - The Meta ATM 
## Description
This Meta ATM is the updated version of the starter template that was provided to us on Metacrafter Website. Many functions are added to it making it more efficient and secure to use.
### Newly Added Functions:
1. **Authenticate** - This function is added for the better security of our Meta ATM. This Function ensures that persoon who knows the password(which is pre-defined can only have access to our Meta ATM by entering the Password.
2. **Amount Handling** - In the code of our starter template we were only able to deposit and withdraw only 1 Ether at a Time but In this project we are able to handle dynamic amount input from the user and deposit or withdraw the amount of Ether user wants.
3. **Transacton History** - This Function is added to keep track of our transaction whether it is deposit or withdraw and display it on oue webpage with transaction type , transaction amount and the time at which transaction happens.
4. **Balance Formatting** - We used function **ethers.utils.formatEther** due to Which the WEI will be changed to Ether. 
5. **Loading State** - We added Loading State in our Website to handle Loading UI during Deposit or Withdraw Transactions.
6. **CSS** - We made our website more effective with the Help of our CSS coding making it more effective.  
## Getting Started
### Video Demo 
[Click Here For Video Explanation](https://www.loom.com/share/e84f252c38f54df785147c3deea7651b?sid=af5dcb29-e19c-4bae-8317-e6dea757cdf5) 
     

### Prerequisites: 
1. Node.js (v14 or higher) - [Download Node.js](https://nodejs.org/)
2. MetaMask extension installed - [Download MetaMask](https://metamask.io/download/)
### Steps To Start The Project: 
1. Clone the project repository:
   ```
   git clone <repository-url>
   ```
2. Inside the project directory, in the terminal type:
   ```
    npm i
   ```
3. Open two additional terminals in our VS code.
4. In the second terminal type:
   ```
   npx hardhat node
   ```
5. In the third terminal, type:
   ```
    npx hardhat run --network localhost scripts/deploy.js
   ```
6. Back in the first terminal, type:
   ```
   npm run dev
   ```
   to launch the front-end. 
 7. After this, the project will be running on your [localhost3000](http://localhost:3000/)

### Steps To setup Metamask Wallet:
1. Open MetaMask and add a new network with the following details:
2. **Network Name:** My local host (or any name you prefer)
3. **RPC URL:** `http://127.0.0.1:8545/`
4. **Chain ID:** `31337`
5. **Currency Symbol:** ETH
6. **Block Explorer URL:** (Leave it unfilled)
7. Add a new account in MetaMask:
   
    I: Click on the accounts dropdown at the top-center.
   
   II: Select "Import Account" and paste the private key of any account generated by `npx hardhat node`.

### Connecting Our ATM Website to Metamask Wallet and Working On It:
1.  Visit [localhost3000](http://localhost:3000/)
2.  Click on the "Connect Account via MetaMask" button.
3.  Select the newly added account.
 
 
 **Now We Can Use Our Meta ATM and can use it for Depositing and Withdrawing Ether.**

 ## Authors
Metacrafter UDAY CHOPRA ---->
[UDAY CHOPRA](https://www.linkedin.com/in/uday-chopra-86701b2b0/) 
    
