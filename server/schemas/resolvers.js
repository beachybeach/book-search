const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await (await User.findOne({ _id: context.user._id })).select("-__v -password");
        return userData;
      }
      throw new AuthenticationError('Not Logged In!');
    }
  },

  Mutation: {
  }
}

module.exports = resolvers;