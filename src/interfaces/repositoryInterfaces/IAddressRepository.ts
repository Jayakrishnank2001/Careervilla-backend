import Address from "../entityInterfaces/IAddress";

interface IAddressRepository{
    saveAddress(addressData: Address): Promise<Address | null>
    updateAddress(addressId: string, addressData: Address): Promise<Address | null>
    

}
export default IAddressRepository