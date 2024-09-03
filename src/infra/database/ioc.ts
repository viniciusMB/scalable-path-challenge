export const database = {
  adapter: Symbol.for('DatabaseAdapter'),
  repositories: {
    product: Symbol.for('ProductRepository'),
  },
};
