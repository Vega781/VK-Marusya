export const searchAnimations = {
    container: {
        hidden: { 
            opacity: 0,
            y: -20
        },
        visible: { 
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.2
            }
        }
    },

    item: {
        hidden: { 
            opacity: 0,
            x: -20
        },
        visible: { 
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3
            }
        }
    },

    hover: {
        scale: 1.02,
        transition: { duration: 0.2 }
    }
};