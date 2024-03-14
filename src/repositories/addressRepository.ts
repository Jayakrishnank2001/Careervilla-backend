import Address from "../interfaces/entityInterfaces/IAddress";
import IAddressRepository from "../interfaces/repositoryInterfaces/IAddressRepository";
import AddressModel from "../models/addressModel";


class AddressRepository implements IAddressRepository{
    async saveAddress(addressData: Address): Promise<Address | null> {
        try {
            const newAddress = new AddressModel({ ...addressData })
            const savedAddress = await newAddress.save()
            return savedAddress as Address
        } catch (error) {
            console.error(error)
            return null
        }
    }


}
export default AddressRepository