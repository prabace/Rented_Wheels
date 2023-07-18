import React from 'react'



export const Policies = (props,{onClose}) => {



    return (        
        <div className="w-[100%] h-screen flex fixed bg-slate-200/90 top-0 justify-center z-40 items-center left-0 ">
            <form class="bg-white shadow-md h-[400px] rounded px-10 py-10 w-[600px] overflow-y-scroll ">
            <div className="-mt-4 mb-6 flex justify-end">
                <p onClick={onClose}>X</p>
            </div>
            <div className='-mt-4'>
                <h1 className='text-2xl flex justify-center items-center mb-4 underline'> TERMS AND CONDITIONS</h1>
            </div>
            <ul>
                <li>
                <b>Acceptance of Terms:</b> By accessing or using our services, including renting a vehicle from our company, you agree to be bound by these Terms and Conditions. Please read them carefully before proceeding.
                </li>
                <li>
                <b>Vehicle Rental and Responsibility:</b> Upon renting a vehicle from our company, the renting party (hereinafter referred to as the "Renter") accepts full responsibility for the vehicle and any consequences arising from its use, including accidents, damages, personal injuries, or property damage caused by the Renter or any third party.
                </li>
                <li>
                <b>Mitigation of Damages:</b> In the event of an accident or unfortunate event, the Renter shall take immediate and appropriate actions to mitigate further damage or harm. This includes notifying the relevant authorities, providing necessary assistance, and following any procedures outlined by the Company or local laws.
                </li>
                <li>
                <b>Indemnification:</b> The Renter agrees to indemnify and hold the Company harmless from any claims, damages, liabilities, or expenses arising from accidents or unfortunate events during the rental period. This includes but is not limited to claims from third parties, legal fees, and any costs associated with repairing or replacing the rented vehicle
                </li>
                <li>
                <b>No Implied Warranty:</b> The Company makes no warranties, expressed or implied, regarding the condition, safety, or suitability of the rented vehicle for any specific purpose. The Renter acknowledges that they have inspected the vehicle and accept it in its current condition.
                </li>
                <li>
                <b>Acceptance of Terms:</b> By accessing or using our services, including renting a vehicle from our company, you agree to be bound by these Terms and Conditions. Please read them carefully before proceeding.
                </li>
            </ul>
            <p>
            By accessing or using our services and renting a vehicle from our company, you agree to abide by these Terms and Conditions, including assuming full responsibility for any accidents, damages, inconveniences, or losses that may occur during the rental period.
            </p>
            <div className=' flex justify-center items-center'>
            <button onClick={(e) =>{
                    props.setAccept(true);
                    props.submit(e);
            }} form='checkout-form' type='submit' className='mt-4 p-2 text-blue-900'>Accept terms and policies</button>
            </div>
            </form>
        </div>

    )
}


