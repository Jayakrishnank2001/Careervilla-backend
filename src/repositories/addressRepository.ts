import Address from "../interfaces/entityInterfaces/IAddress";
import IAddressRepository from "../interfaces/repositoryInterfaces/IAddressRepository";
import AddressModel from "../models/addressModel";


class AddressRepository implements IAddressRepository {
    async saveAddress(companyData: Address): Promise<Address | null> {
        try {
            const newAddress = new AddressModel(
                {
                    address: companyData.address,
                    city: companyData.city,
                    state: companyData.state,
                    country: companyData.country
                },
            )
            const savedAddress = await newAddress.save()
            return savedAddress as Address
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async updateAddress(addressId: string, addressData: Address): Promise<Address | null> {
        try {
            const updateAddress = await AddressModel.findByIdAndUpdate(addressId,
                {
                    address: addressData.address,
                    city: addressData.city,
                    state: addressData.state,
                    country: addressData.country
                },
                { new: true }
            )
            return updateAddress
        } catch (error) {
            console.error(error)
            return null
        }
    }


}
export default AddressRepository