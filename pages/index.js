import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [amount, setAmount] = useState(1);
  const [transactionHistory, setTransactionHistory] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState('');

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  }
  
  

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  }

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
   setATM(atmContract);
  }

  const getBalance = async () => {
    if (atm) {
      const balanceBigNumber = await atm.getBalance();
      setBalance(ethers.utils.formatEther(balanceBigNumber));
    }
  }

  const deposit = async () => {
    try {
      setLoading(true);
      if (atm) {
        let tx = await atm.deposit(ethers.utils.parseEther(amount.toString()));
        await tx.wait();
        getBalance();

        setTransactionHistory([...transactionHistory, { type: 'Deposit', amount, timestamp: new Date().toISOString() }]);
      }
    } 
    catch (error) {
      console.error("Deposit error:", error);
      alert("Deposit failed!");
    }
     finally {
      setLoading(false);
    }
  }

  const withdraw = async () => {
    try {
      setLoading(true);
      if (atm) {
        let tx = await atm.withdraw(ethers.utils.parseEther(amount.toString()));
        await tx.wait();
        getBalance();

        setTransactionHistory([...transactionHistory, { type: 'Withdraw', amount, timestamp: new Date().toISOString() }]);
      }}
     catch (error) {
      console.error("Withdraw error:", error);
      alert("Withdraw failed!");
    } 
    finally {
      setLoading(false);
    }
  }

  

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setInputPassword(e.target.value);
  };

  const authenticate = () => {
    
    const predefinedPassword = 'Metacrafter';
    if (inputPassword === predefinedPassword) {
      setAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

 

  const renderTransactionHistory = () => {
    return transactionHistory.map((tx, index) => (
      <p key={index}>{tx.timestamp}: {tx.type} of {tx.amount} ETH {tx.to ? `to ${tx.to}` : ''}</p>
    ));
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }
    if (!authenticated) {
      return (
        <div>
          <input
            type="password"
            placeholder="Enter Password"
            value={inputPassword}
            onChange={handlePasswordChange}
          />
          <button onClick={authenticate}>Submit</button>
        </div>
      );
    }

    if (balance === undefined) {
      getBalance();
    }


    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance} ETH</p>
        <input type="number" value={amount} onChange={handleAmountChange} />
        <button onClick={deposit} disabled={loading}>Deposit</button>
        <button onClick={withdraw} disabled={loading}>Withdraw</button>
       
        
        {loading && <p>Loading...</p>}
        <div>
          <h2>Transaction History</h2>
          {renderTransactionHistory()}
        </div>
      </div>
    )
  }

  useEffect(() => {
    getWallet();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (atm) {
        getBalance();
      }
    }, 2000); 

    return () => clearInterval(interval); 
  }, [atm]);

  return (
    <main className="container">
      <header><h1>Welcome to the Meta ATM !! How Can We Help YOU</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
         display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          text-align: center;
          font-family: Georgia, Serif;
          max-width: 600px;
          margin:  0 auto;
          padding: 2rem;
          border-radius: 10px;
          border: 3px solid black;
           outline-width: thin;
          
          
         
          background-color: #e0e0e0;
          background: linear-gradient(135deg, #cba0a0, #cba0a0);
        }
        header h1 {
          font-size: 2.5rem;
          color: #8b0000 ;
          margin-bottom: 1rem;
        }
        button {
          margin: 0.5rem;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          border: none;
          border-radius: 5px;
          background-color: #;
          color: #8b0000;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.3s;
        }
        button:hover {
          background-color: #005bb5;
          transform: scale(1.05);
        }
        button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        input {
          padding: 0.75rem;
          font-size: 1rem;
          margin: 0.5rem 0;
          border: 1px solid #ccc;
          border-radius: 5px;
          width: calc(100% - 1.5rem);
        }
        h2 {
          font-size: 1.5rem;
          color: #333;
          margin-top: 2rem;
        }
        p {
          font-size: 1rem;
          color: #666;
          margin: 0.5rem 0;
        }
      `}</style>
    </main>
  )
}
