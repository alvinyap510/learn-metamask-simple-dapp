/*global ethereum, MetamaskOnboarding */

/*
The `piggybankContract` is compiled from:

  pragma solidity ^0.4.0;
  contract PiggyBank {

      uint private balance;
      address public owner;

      function PiggyBank() public {
          owner = msg.sender;
          balance = 0;
      }

      function deposit() public payable returns (uint) {
          balance += msg.value;
          return balance;
      }

      function withdraw(uint withdrawAmount) public returns (uint remainingBal) {
          require(msg.sender == owner);
          balance -= withdrawAmount;

          msg.sender.transfer(withdrawAmount);

          return balance;
      }
  }
*/

const forwarderOrigin = "http://localhost:9010";

// Intialize function will be called once the page loads.
const initialize = () => {
  // Create Metamask onboarding object
  const onboarding = new MetaMaskOnBoarding({ forwarderOrigin });

  // Select connect button
  const onboardButton = document.getElementById("connectButton");

  // Check whether Metamask is installed
  const isMetamaskInstalled = () => {
    // Get ethereum object from window
    const { ethereum } = window;

    return Boolean(ethereum && ethereum.isMetamask);
  };

  const onclickInstall = () => {
    onboardButton.innerText = "Onboarding in progress";
    onboardButton.disabled = true;

    onboarding.startOnboarding();
  };

  // Actions on the status of isMetamaskInstalled
  const metamaskClientCheck = () => {
    if (!isMetamaskInstalled()) {
      onboardButton.innerText = "Click here to install Metamask";
      onboardButton.onclick = onclickInstall;
      onboardButton.disabled = false;
    } else {
      onboardButton.innerText = "Connect Wallet";
    }
  };
  metamaskClientCheck();
};

window.addEventListener("DOMContentLoaded", initialize);
