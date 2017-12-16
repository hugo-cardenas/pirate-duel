export const attacks = {
    ATTACK_FARMER: 'You fight like a Dairy Farmer!',
    ATTACK_END: 'This is the END for you, you gutter crawling cur!',
    ATTACK_APE: 'I\'ve spoken with apes more polite than you!',
    ATTACK_KEBAB: 'Soon you\'ll be wearing my sword like a shish kebab!',
    ATTACK_FALL: 'People fall at my feet when they see me coming!',
    ATTACK_INSOLENCE: 'I\'m not going to take your insolence sitting down!',
    ATTACK_DOG: 'I once owned a dog that was smarter than you.',
    ATTACK_BLOOD: 'Nobody\'s ever drawn blood from me and nobody ever will.',
    ATTACK_DIAPERS: 'Have you stopped wearing diapers yet?',
    ATTACK_DISGUSTING: 'There are no words for how disgusting you are.',
    ATTACK_PUKE: 'You make me want to puke.',
    ATTACK_HANDKERCHIEF: 'My handkerchief will wipe up your blood!',
    ATTACK_SCAR: 'I got this scar on my face during a mighty struggle!',
    ATTACK_SNEAK: 'I\'ve heard you are a contemptible sneak.',
    ATTACK_BRAINS: 'You\'re no match for my brains, you poor fool.',
    ATTACK_BEGGAR: 'You have the manners of a beggar.'
};

export const defenses = {
    DEFENSE_COW: 'How appropriate! You fight like a cow!',
    DEFENSE_TIP: 'And I\'ve got a little TIP for you, get the POINT?',
    DEFENSE_FAMILY: 'I\'m glad to hear you attended your family reunion!',
    DEFENSE_DUSTER: 'First you better stop waving it about like a feather duster.',
    DEFENSE_BREATH: 'Even BEFORE they smell your breath?',
    DEFENSE_HEMORROIDS: 'Your hemorroids are flaring up again eh?',
    DEFENSE_TAUGHT: 'He must have taught you everything you know.',
    DEFENSE_RUN: 'You run THAT fast?',
    DEFENSE_BORROW: 'Why? Did you want to borrow one?',
    DEFENSE_LEARNED: 'Yes there are. You just never learned them.',
    DEFENSE_ALREADY: 'You make me think somebody already did.',
    DEFENSE_JANITOR: 'So you got that job as janitor, after all.',
    DEFENSE_NOSE: 'I hope now you\'ve learned to stop picking your nose.',
    DEFENSE_NOONE: 'Too bad no one\'s ever heard of YOU at all.',
    DEFENSE_USED: 'I\'d be in real trouble if you ever used them.',
    DEFENSE_COMFORTABLE: 'I wanted to make sure you\'d feel comfortable with me.',

    // Useless ones
    DEFENSE_RUBBER: 'I am rubber, you are glue',
    DEFENSE_YEAH: 'Oh yeah?',
    DEFENSE_SHAKING: 'I\'m shaking, I\'m shaking!',
    DEFENSE_GIVEUP: 'Ok, I give up!'
};

export const map = {
    [attacks.ATTACK_FARMER]: defenses.DEFENSE_COW,
    [attacks.ATTACK_END]: defenses.DEFENSE_TIP,
    [attacks.ATTACK_APE]: defenses.DEFENSE_FAMILY,
    [attacks.ATTACK_KEBAB]: defenses.DEFENSE_DUSTER,
    [attacks.ATTACK_FALL]: defenses.DEFENSE_BREATH,
    [attacks.ATTACK_INSOLENCE]: defenses.DEFENSE_HEMORROIDS,
    [attacks.ATTACK_DOG]: defenses.DEFENSE_TAUGHT,
    [attacks.ATTACK_BLOOD]: defenses.DEFENSE_RUN,
    [attacks.ATTACK_DIAPERS]: defenses.DEFENSE_BORROW,
    [attacks.ATTACK_DISGUSTING]: defenses.DEFENSE_LEARNED,
    [attacks.ATTACK_PUKE]: defenses.DEFENSE_ALREADY,
    [attacks.ATTACK_HANDKERCHIEF]: defenses.DEFENSE_JANITOR,
    [attacks.ATTACK_SCAR]: defenses.DEFENSE_NOSE,
    [attacks.ATTACK_SNEAK]: defenses.DEFENSE_NOONE,
    [attacks.ATTACK_BRAINS]: defenses.DEFENSE_USED,
    [attacks.ATTACK_BEGGAR]: defenses.DEFENSE_COMFORTABLE
};
