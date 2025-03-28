import * as dotenv from "dotenv";
import { connectToDb } from "./utils/database.js";
import Subscription from "./models/subscription.model.js";
import Category from "./models/category.model.js";
import Analytics from "./models/analytic.model.js";

dotenv.config();

const seedDb = async () => {
  connectToDb();
  try {
    await Subscription.deleteMany();
    await Category.deleteMany();
    await Analytics.deleteMany();

    // Add subscriptions
    const subscriptions = [
      {
        name: "Free",
        description: "Free plan",
        price: 0,
        selling_price: 0,
        duration: "forever",
        features: [
          {
            display_name: "Number of links",
            slug: "link_count",
            metadata: {
              number: 10,
            },
            description: "List upto 10 link on the platform.",
          },
          {
            display_name: "Basic Analytics",
            slug: "basic_analytics",
            metadata: {},
            description: "Get basic analytics of your profile and links.",
          },
          {
            display_name: "Basic Background",
            slug: "basic_background",
            metadata: {
              type: ["flat", "gradient"],
            },
            description: "Basic background customization.",
          },
          {
            display_name: "Basic Support",
            slug: "basic_support",
            metadata: {
              support: "email",
            },
            description: "Basic support.",
          },
        ],
      },
      {
        name: "Pro",
        description: "Pro plan",
        price: 12.99,
        selling_price: 10.99,
        duration: "monthly",
        features: [
          {
            display_name: "Number of links",
            slug: "link_count",
            metadata: {
              number: 50,
            },
            description: "List upto 10 link on the platform.",
          },
          {
            display_name: "Advance Analytics",
            slug: "advance_analytics",
            metadata: {},
            description: "Get advance analytics of your profile and links.",
          },
          {
            display_name: "Custom Background",
            slug: "custom_background",
            metadata: {
              type: ["flat", "gradient", "image", "video"],
            },
            description: "Custom background customization.",
          },
          {
            display_name: "Custom Domain",
            slug: "custom_domain",
            metadata: {
              type: "subdomain",
            },
            description: "Custom domain for your profile.",
          },
          {
            display_name: "Priority Support",
            slug: "priority_support",
            metadata: {
              support: "email",
            },
            description: "Priority support.",
          },
        ],
      },
      {
        name: "Pro",
        description: "Pro plan",
        price: 120.99,
        selling_price: 99.99,
        duration: "yearly",
        features: [
          {
            display_name: "Number of links",
            slug: "link_count",
            metadata: {
              number: 50,
            },
            description: "List upto 10 link on the platform.",
          },
          {
            display_name: "Advance Analytics",
            slug: "advance_analytics",
            metadata: {},
            description: "Get advance analytics of your profile and links.",
          },
          {
            display_name: "Custom Background",
            slug: "custom_background",
            metadata: {
              type: ["flat", "gradient", "image", "video"],
            },
            description: "Custom background customization.",
          },
          {
            display_name: "Custom Domain",
            slug: "custom_domain",
            metadata: {
              type: "subdomain",
            },
            description: "Custom domain for your profile.",
          },
          {
            display_name: "Priority Support",
            slug: "priority_support",
            metadata: {
              support: "email",
            },
            description: "Priority support.",
          },
        ],
      },
    ];

    const categories = [
      {
        name: "Business",
        icon: "📈",
        description:
          "For startups, entrepreneurs, and businesses to showcase their brand.",
      },
      {
        name: "Freelancer",
        icon: "💻",
        description:
          "Ideal for freelancers to share their portfolio and services.",
      },
      {
        name: "Content Creator",
        icon: "🎥",
        description:
          "Perfect for YouTubers, bloggers, and influencers to share their content links.",
      },
      {
        name: "E-commerce",
        icon: "🛍️",
        description:
          "For online sellers and stores to showcase products and drive sales.",
      },
      {
        name: "Developer",
        icon: "👨‍💻",
        description:
          "A hub for developers to showcase projects, GitHub, and tech skills.",
      },
      {
        name: "Artist",
        icon: "🎨",
        description:
          "For designers, musicians, and creatives to share their work and portfolios.",
      },
      {
        name: "Health & Fitness",
        icon: "🏋️",
        description:
          "For trainers, dietitians, and fitness enthusiasts to offer programs and tips.",
      },
      {
        name: "Education",
        icon: "📚",
        description:
          "Ideal for educators, trainers, and coaches to share courses and resources.",
      },
      {
        name: "NGO & Social Work",
        icon: "🌍",
        description:
          "For non-profits and social workers to spread awareness and receive support.",
      },
    ];

    await Category.insertMany(categories);
    await Subscription.insertMany(subscriptions);
  } catch (error) {
    console.log(error);
  }
};

seedDb();
