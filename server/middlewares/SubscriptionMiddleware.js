export const checkSubscription = (requiredFeature) => {
  return (req, res, next) => {
    const userPlan = req.user.subscription.plan;
    const allowedFeatures = plans[userPlan]?.features || [];

    if (!allowedFeatures.includes(requiredFeature)) {
      return res
        .status(403)
        .json({ message: "Upgrade required to access this feature" });
    }

    next();
  };
};
