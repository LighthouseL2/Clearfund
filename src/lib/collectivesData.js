/**
 * Centralized collectives/campaign data used across the app.
 * Each collective has metadata displayed on the GoodCollective listing and the individual donation page.
 */

export const collectives = [
    {
        id: 1,
        title: "GoodDollar UBI+ for Women – Colombia",
        description: "This pool provides additional daily G$ to women in Colombia through a segmented basic income model.",
        about: `Women represent the majority of unpaid labor worldwide caregiving, household management, community organizing yet this work remains largely invisible to traditional economic systems. Despite being central to the functioning of families and societies, women continue to face systemic barriers to capital, representation, and opportunity: wage gaps, limited access to credit, underrepresentation in financial and political institutions, and disproportionate vulnerability to economic shocks.\n\nThis pool provides additional daily G$ to women in columbia through a segmented basic income model a framework that directs resources to those who have historically been underserved by traditional financial systems.`,
        date: "Created: October 20, 2024",
        launchDate: "October 20, 2024",
        location: "Colombia",
        category: "Economic Development",
        status: "Active",
        twitter: "https://x.com/gooddollarorg",
        web: "https://gooddapp.org/",
        scan: "https://celoscan.io/address/0x0d43131f1577310D6349bAF9D6Da4fC1Cd39764C",
        image: "/donate-images/happy.png",
    },
    {
        id: 2,
        title: "Silvi - Kenya's Kakamega forest",
        description: "This Collective directly supports smallholder farmers around Kenya's Kakamega forest.",
        about: `Kenya's Kakamega forest is one of the last remnants of the great tropical rainforest that once spanned the African continent. The forest is home to an incredible diversity of plant and animal species, many of which are found nowhere else on Earth.\n\nThis Collective directly supports smallholder farmers around Kenya's Kakamega forest through sustainable agroforestry practices, providing daily G$ distributions to those working on reforestation and conservation efforts.`,
        date: "Created: October 21, 2024",
        launchDate: "October 21, 2024",
        location: "Kenya",
        category: "Environmental Conservation",
        status: "Active",
        twitter: "https://x.com/gooddollarorg",
        web: "https://gooddapp.org/",
        scan: "https://celoscan.io/address/0xC1dCdf8E70acB44CDbB688C91A4883Cf9052Ea9c",
        image: "/donate-images/grass.jpg",
    },
    {
        id: 3,
        title: "GoodDollar UBI+ for Women – Nigeria",
        description: "This pool provides additional daily G$ to women in Nigeria through a segmented basic income model.",
        about: `Nigeria stands as one of Africa’s leading economic powerhouses, yet a significant gap remains in financial inclusion for women. By expanding access to modern banking, credit, and sustainable economic pathways, we empower Nigerian women to achieve financial independence and drive transformative growth within their communities.\n\nThis pool provides additional daily G$ to women in Nigeria through a segmented basic income model, empowering them with digital assets that can be used for daily needs, savings, and micro-enterprise development.`,
        date: "Created: October 20, 2024",
        launchDate: "October 20, 2024",
        location: "Nigeria",
        category: "Economic Development",
        status: "Active",
        twitter: "https://x.com/gooddollarorg",
        web: "https://gooddapp.org/",
        scan: "https://celoscan.io/address/0xDd1c12f197E6D1E2FBA15487AaAE500eF6e07BCA",
        image: "/donate-images/laugh.png",
    },
    {
        id: 4,
        title: "Pesia's Kitchen EAT Initiative",
        description: "A community-powered food rescue initiative committed to reducing waste and ensuring food security.",
        about: `Pesia's Kitchen EAT Initiative is a community-powered food rescue initiative committed to reducing waste and ensuring food security for underserved populations. Working at the intersection of sustainability and social impact, the initiative rescues surplus food from local markets and restaurants.\n\nThrough partnerships with community organizations, the recovered food is redistributed to families and individuals in need, ensuring that nutritious meals reach those who need them most.`,
        date: "Created: May 30, 2025",
        launchDate: "May 30, 2025",
        location: "Global",
        category: "Food Security",
        status: "Active",
        twitter: "https://x.com/gooddollarorg",
        web: "https://gooddapp.org/",
        scan: "https://celoscan.io/address/0xE4f65e8644C0f3a1C7ef0BA0F1428A82cDc0E7Bc",
        image: "/donate-images/cooking.jpg",
    },
    {
        id: 5,
        title: "Global Classrooms Environmental Education",
        description: "Global Classrooms connects students worldwide to collaborate on environmental projects aligned with UN Sustainable Development Goals.",
        about: `Global Classrooms connects students worldwide to collaborate on environmental projects aligned with UN Sustainable Development Goals. Through digital platforms and in-person exchanges, students learn about climate change, biodiversity loss, and sustainable development.\n\nThe program provides resources, mentorship, and funding for student-led environmental projects, fostering a new generation of environmentally conscious leaders who can drive meaningful change in their communities.`,
        date: "Created: May 30, 2025",
        launchDate: "May 30, 2025",
        location: "Global",
        category: "Education",
        status: "Active",
        twitter: "https://x.com/gooddollarorg",
        web: "https://gooddapp.org/",
        scan: "https://celoscan.io/address/0xf3d629a2c198fC91d7D3F18217684166C83C7312",
        image: "/donate-images/cartoon.jpg",
    },
]

/**
 * Get a collective by its ID
 */
export function getCollectiveById(id) {
    return collectives.find(c => c.id === parseInt(id))
}
