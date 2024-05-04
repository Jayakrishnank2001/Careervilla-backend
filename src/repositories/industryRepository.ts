import Industry from "../interfaces/entityInterfaces/IIndustry";
import IIndustryRepository from "../interfaces/repositoryInterfaces/IIndustryRepository";
import IndustryModel from "../models/industryModel";


class IndustryRepository implements IIndustryRepository {

    async getAllIndustries(page: number, limit: number, searchQuery: string): Promise<Industry[]> {
        try {
            if (searchQuery === 'undefined') {
                const result = await IndustryModel.find()
                return result as Industry[]
            }
            const regex = new RegExp(searchQuery, 'i');
            const result = await IndustryModel.find({
                $or: [
                    { industryName: { $regex: regex } },
                ]
            })
                .skip((page - 1) * limit)
                .limit(limit)
                .exec();
            return result as Industry[];
        } catch (error) {
            console.error(error)
            throw new Error('Error occured')
        }
    }

    async getIndustriesCount(searchQuery: string): Promise<number> {
        try {
            const regex = new RegExp(searchQuery, 'i')
            return await IndustryModel.find({
                $or: [
                    { industryName: { $regex: regex } },
                ]
            }).countDocuments()
        } catch (error) {
            console.error(error)
            throw new Error('Error occured')
        }
    }

    async industryExists(industryName: string): Promise<Industry|null> {
        try {
            let existingIndustry
            const normalizedIndustryName = industryName?.trim().toLowerCase();
            if (normalizedIndustryName) {
                existingIndustry = await IndustryModel.findOne({
                    industryName: { $regex: new RegExp(`^${normalizedIndustryName}$`, 'i') },
                });
            }
            return existingIndustry as Industry
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async deleteIndustry(industryId: string): Promise<boolean> {
        try {
            const result = await IndustryModel.findByIdAndDelete(industryId)
            return !!result
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async saveIndustry(industry: Industry): Promise<Industry | null> {
        try {
            const newIndustry = new IndustryModel(industry)
            await newIndustry.save()
            return newIndustry as Industry
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async updateIndustry(industryId: string, updates: Partial<Industry>): Promise<Industry | null> {
        try {
            const updatedIndustry = await IndustryModel.findByIdAndUpdate(industryId, updates, { new: true })
            return updatedIndustry as Industry
        } catch (error) {
            console.error(error)
            return null
        }
    }







}
export default IndustryRepository