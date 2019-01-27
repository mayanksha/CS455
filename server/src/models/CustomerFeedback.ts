import Sequelize = require('sequelize');
import { SequelizeAttributes } from '../typings/SequelizeAttributes';
// Attributes are the fields of a tuple from a relation
export interface CustomerFeedbackAttributes {
	id?: number;
	response1: number;
	response2: number;
	response3: number;
	response4: number;
	textMessage?: string;
	createdAt?: Date;
	updatedAt?: Date;
}
const MAX_TEXT_LEN = 500;
export interface CustomerFeedbackInstance extends Sequelize.Instance<CustomerFeedbackAttributes>, CustomerFeedbackAttributes {
	/*getResponses: Sequelize.j*/
}
// Instance is a single database row (A Tuple)
// Just declares the type
type CustomerFeedbackModel = Sequelize.Model<CustomerFeedbackInstance, CustomerFeedbackAttributes>;

export const CustomerFeedbackFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<CustomerFeedbackInstance, CustomerFeedbackAttributes> => {
	const attributes: SequelizeAttributes<CustomerFeedbackAttributes> = {
		response1: {
			type: DataTypes.INTEGER,
			defaultValue: 3,
			allowNull: false
		},
		response2: {
			type: DataTypes.INTEGER,
			defaultValue: 3,
			allowNull: false
		},
		response3: {
			type: DataTypes.INTEGER,
			defaultValue: 3,
			allowNull: false
		},
		response4: {
			type: DataTypes.INTEGER,
			defaultValue: 3,
			allowNull: false
		},
   textMessage: {
     type: Sequelize.STRING(500),
     allowNull: true,
   }
	}

	const Feedback = sequelize.define<CustomerFeedbackInstance, CustomerFeedbackAttributes>('Feedback', attributes);

	return Feedback;
}
