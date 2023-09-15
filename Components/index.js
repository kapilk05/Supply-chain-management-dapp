import React,{useState,useEffect,useContext} from 'react';

import{
    Table,
    Form,
    Services,
    Profile,
    CompleteShipment,
    GetShipment,
    StartShipment,
} from "../Components/index";
import {TrackingContext} from "../Context/TrackingContext";

const index = () => {
    const {
        currentUser,
        createShipment,
        getAllShipment,
        completeShipment,
        getShipment,
        startShipment,
        getShipmentsCount,

    } = useContext(TrackingContext);

    //STATE VARIABLE
    const [createShipmentModel , setCreateShipmentModel ] = useState(false);
    const [openProfile , setOpenProfile] = useState(false);
    const [startModal , setStartModal] = useState(false);
    const [completeModal , setCompleteModal] = useState(false);
    const [getModal , setGetModal] = useState(false);

    //Data State variables

    const [allShipmentsdata,setallShipmentsdata] = useState();

    useEffect(() => {
        const getCampaignsData  = getAllShipment();

        return async (data) => {
            const allData = await getCampaignsData;
            setallShipmentsdata(allData);
        };
    },[]);

    return (
        <>
        <Services
            setOpenProfile = {setOpenProfile}
            setCompleteModal = {setCompleteModal}
            setGetModal = {setGetModal}
            setStartModal = {setStartModal}
        />
        <Table
            setCreateShipmentModel = {setCreateShipmentModel}
            allShipmentsdata = {allShipmentsdata} 
        />
        <Form
            createShipmentModel={createShipmentModel}
            createShipment={createShipment}
            setCreateShipmentModel={setCreateShipmentModel}
        />
        <Profile
            openProfile={openProfile}
            setOpenProfile={setOpenProfile}
            currentUser={currentUser}
            getShipmentsCount={getShipmentsCount}
        />
        <CompleteShipment
            completeModal={completeModal}
            setCompleteModal={setCompleteModal}
            CompleteShipment={completeShipment}        
        />
        <GetShipment
            getModal={getModal}
            setGetModal={setGetModal}
            getShipment={getShipment}
        />
        <StartShipment
            startModal={startModal}
            setStartModal={setStartModal}
            startShipment={startShipment}
        />
    </>
    );
};

export default index;