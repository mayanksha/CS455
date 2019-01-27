import Sequelize = require('sequelize');
import { DbInterface } from '../typings/DbInterface';
import { CustomerFeedbackFactory } from '../models/CustomerFeedback';

export const createModels = (sequelizeConfig: any): DbInterface => {
  const { database, username, password, params } = sequelizeConfig;
  const sequelize = new Sequelize(database, username, password, params);

  const db: DbInterface = {
    sequelize,
    Sequelize,
    Feedback: CustomerFeedbackFactory(sequelize, Sequelize),
  };

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
};
