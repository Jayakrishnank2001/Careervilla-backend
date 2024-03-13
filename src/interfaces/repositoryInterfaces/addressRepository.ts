import Address from "../entityInterfaces/address";

interface IAddressRepository{
    saveAddress(addressData: Address): Promise<Address | null>
    

}
export default IAddressRepository