const { AbilityBuilder, Ability } = require('@casl/ability');

const abilitiesMiddleware = (req, res, next) => {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (req.user.role === 'admin') {
    can('manage', 'all');
  } else if (req.user.role === 'owner') {
    can('manage', 'Book', { ownerId: req.user.id });
    cannot('delete', 'Book', { approved: true });
  } else if (req.user.role === 'renter') {
    can('read', 'Book');
  }

  req.ability = build();
  next();
};

module.exports = abilitiesMiddleware;
