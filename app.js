// Import WalletConnect provider and Web3
const WalletConnectProvider = window.WalletConnectProvider.default;
const Web3 = window.Web3;

// Create WalletConnect Provider
const provider = new WalletConnectProvider({
    infuraId: "YOUR_INFURA_PROJECT_ID", // Replace with your Infura Project ID or remove if not using Infura
});

// Create Web3 instance
const web3 = new Web3(provider);

const connectWalletButton = document.getElementById('connect-wallet');
const userAddressElement = document.getElementById('user-address');

// Connect Wallet function
async function connectWallet() {
    try {
        // Enable session (triggers QR Code modal)
        await provider.enable();

        // Get accounts
        const accounts = await web3.eth.getAccounts();

        // Display the user's wallet address
        userAddressElement.innerText = `Connected: ${accounts[0]}`;
    } catch (error) {
        console.error("Error connecting to wallet:", error);
    }
}

// Event listener for the connect wallet button
connectWalletButton.addEventListener('click', connectWallet);

// Handle disconnect (optional)
provider.on("disconnect", (code, reason) => {
    console.log(code, reason);
    userAddressElement.innerText = "Disconnected";
});

