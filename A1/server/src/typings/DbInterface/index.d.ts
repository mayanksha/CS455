import * as Sequelize from 'sequelize';
import { CustomerFeedbackAttributes, CustomerFeedbackInstance  } from '../../models/CustomerFeedback';
export interface DbInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  Feedback: Sequelize.Model<CustomerFeedbackInstance, CustomerFeedbackAttributes>;
}
