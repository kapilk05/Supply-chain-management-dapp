import React, { useState, useEffect }from 'react'
import Web3Modal from "web3modal";
import { ethers } from "ethers";


//INTERNAL IMPORT
import tracking from "../Context/Tracking.json";
const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ContractABI = tracking.abi;


//FETCH THE SMART CONTRACT
const fetchContract = (signerOrProvider) =>
new ethers.Contract(ContractAddress,ContractABI,signerOrProvider);

export const TrackingContext = React.createContext();


export const TrackingProvider = ({children }) => {
    const DappName = "Product Tracking App";
    const [currentUser,setCurrentUser] = useState("")

    const createShipment = async(items) => {
        console.log(items);
        const {
            reciever, timeofPickup, distance, price } = items;

            try {
                const web3modal = new Web3Modal();
                const connection = await web3Modal.connect();
                const provider = new ethers.providers.Web3Provider(connection);
                const signer =provider.getSigner();
                const contract = fetchContract(signer);
                const createItem = await contract.createShipment(
                    reciever,
                    new Date(timeofPickup).getTime(),
                    distance,
                    ethers.utils.parseUnits(price,18),{
                        value: ethers.utils.parseUnits(price,18)
                    }
                );
                await createItem.wait();
                console.log(createItem);
            }
            catch (error) {
                console.log("Something went wrong :(", error)
            }
        };
        const getAllShipment = async () =>
        {
            try{
                const provider = new ethers.providers.JsonRpcProvider();
                const contract = fetchContract(provider);

                const shipments = await contract.getAllTransactions()
                const allShipments = shipments.map((shipment) => ({
                    sender: shipment.sender,
                    reciever: shipment.reciever,
                    price: ethers.utils.formatEther(shipment.price.toString()),
                    timeofPickup: shipment.timeofPickup.toNumber(),
                    timeofDelivery: shipment.timeofDelivery.toNumber(),
                    distance: shipment.distance.toNumber(),
                    paymentDone: shipment.paymentDone,
                    status: shipment.status
                }));
                
                return allShipments;
            }
            catch(error)
            {
                console.log("Something went wrong")
            }
        };

        const getShipmentsCount = async () =>
        {
            try {
                if(!window.ethereum) return "MetaMask not found!!! Install Metamask"

                const accounts = await window.ethereum.request({
                    method:"eth_accounts",
                });

                const provider = new ethers.providers.JsonRpcProvider();
                const contract = fetchContract(provider);
                const shipmentsCount = await contract.getShipmentsCount(accounts[0]);
                return shipmentsCount.toNumber();
            } catch(error){
                console.log("Error :(",error);
            }
        };

        const completeShipment = async (completeShip) =>{
            console.log(completeShip);

            const { reciever, index} = completeShip;
            try{
                if(!window.ethereum) return "Please Install MetaMask";


                const accounts = await window.ethereum.request({
                    method: "eth_accounts",
                });

                const web3Modal = new web3Modal();
                const connection = await web3Modal.connect();
                const provider = new ethers.providers.Web3Provider(connection);
                const signer = provider.getSigner();
                const contract = fetchContract(signer);
                const transaction = await contract.completeShipment(
                    accounts[0],
                    reciever,
                    index,
                    {
                        gasLimit: 300000,
                    }
                );
                transaction.wait();
                console.log(transaction);
            }
            catch(error){
                console.log("Error:(",error)
            }
        };

        const getShipment = async (index) =>{
            console.log(index * 1);
            try {
                if(!window.ethereum) return "Install Metamask";


                const accounts = await window.ethereum.request({
                    method: "eth_accounts,"
                });

                const provider = new ethers.providers.JsonRpcProvider();
                const contract = fetchContract(provider);
                const shipmentsCount = await contract.getShipment(accounts[0], index * 1);

                const SingleShipment = 
                {
                    sender: shipment[0],
                    reciever: shipment[1],
                    timeofPickup: shipment[2].toNumber(),
                    timeofDelivery: shipment[3].toNumber(),
                    distance: shipment[4].toNumber(),
                    price: ethers.utils.formatEther(shipment[5].toString()),
                    paymentDone: shipment[6],
                    status: shipment[7],
                };
            return SingleShipment;
            }
            catch(error){
                console.log("Sorry Error");
            }
        };


        const startShipment = async (getProduct) => {
            const { reciever, index} = getProduct;
            try
            {
                if(!window.ethereum) return "Install Metamask";
    
    
                    const accounts = await window.ethereum.request({
                        method: "eth_accounts,"
                    });
                const web3Modal = new web3Modal();
                const connection = await web3Modal.connect();
                const provider = new ethers.providers.Web3Provider(connection);
                const signer = provider.getSigner();
                const contract = fetchContract(signer);

                const shipment = await contract.startShipment(
                    accounts[0],
                    reciever,
                    index * 1,
                )

                shipment.wait();
                console.log(shipment)
            }
            catch(error){
                console.log("Sorry Error");
            }

        };
       //CONNECT YOUR WALLET
        const checkIfWalletConnected = async () =>

        {
            try {
                if(!window.ethereum) return "Install Metamask";


                const accounts = await window.ethereum.request({
                    method: "eth_accounts,"
                });

                if(accounts.length) {
                    setCurrentUser(accounts[0])
                }
                else{
                    return "No Account"
                }
        }
        catch(error){
            console.log("Sorry account not connected");
        }
        };

    //connect wallet
    const connectWallet = async () =>{
        try {
            if(!window.ethereum) return "Install Metamask";
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts,"
            });
            setCurrentUser(accounts[0])
    }
    
    catch(error){
        console.log("Sorry Error");
    }
};

    useEffect(() =>{
        checkIfWalletConnected();
    },[]);
    return(
        <TrackingContext.Provider 
            value={{
                connectWallet,
                createShipment,
                getAllShipment,
                getShipmentsCount,
                completeShipment,
                getShipment,
                startShipment,
                DappName,
                currentUser,

            }}
    >
        {children}
    </TrackingContext.Provider>
    );
};




