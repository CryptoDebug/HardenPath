import { categories, getCoursesByCategory } from "@/content/catalog";
import type { Locale } from "@/lib/i18n-client";

export type ExamQuestion = {
  correctOption: number;
  explanation: Record<Locale, string>;
  options: Record<Locale, string[]>;
  question: Record<Locale, string>;
};

export type ExamTask = {
  prompt: Record<Locale, string>;
  rubric: Record<Locale, string[]>;
  title: Record<Locale, string>;
};

export type BeginnerExam = {
  categorySlug: string;
  durationMinutes: number;
  passingScore: number;
  scenario: Record<Locale, string>;
  tasks: ExamTask[];
  title: Record<Locale, string>;
  questions: ExamQuestion[];
};

type ExamInput = {
  categorySlug: string;
  title: Record<Locale, string>;
  scenario: Record<Locale, string>;
  focus: Record<Locale, string[]>;
};

const examInputs: ExamInput[] = [
  {
    categorySlug: "network",
    title: { fr: "Examen débutant Réseau", en: "Beginner Networking Exam" },
    scenario: {
      fr: "Tu rejoins une équipe qui doit diagnostiquer un petit réseau de lab : un poste reçoit une adresse, résout parfois les noms, mais n'atteint pas toujours l'intranet. Tu dois raisonner sans changer la configuration au hasard.",
      en: "You join a team diagnosing a small lab network: a workstation receives an address, sometimes resolves names, but does not always reach the intranet. You must reason without random configuration changes."
    },
    focus: {
      fr: ["IP, masque, passerelle et sous-réseau", "DNS, DHCP et résolution", "segmentation, routage et filtrage", "méthode de diagnostic"],
      en: ["IP, mask, gateway, and subnet", "DNS, DHCP, and resolution", "segmentation, routing, and filtering", "diagnostic method"]
    }
  },
  {
    categorySlug: "hardware-infrastructure",
    title: { fr: "Examen débutant Infrastructure", en: "Beginner Infrastructure Exam" },
    scenario: {
      fr: "Tu dois produire une première lecture d'une petite infrastructure : postes, serveur de fichiers, sauvegardes, comptes et exposition cloud minimale. Le but est de prioriser sans collecter de données personnelles.",
      en: "You must produce a first reading of a small infrastructure: workstations, file server, backups, accounts, and minimal cloud exposure. The goal is prioritization without collecting personal data."
    },
    focus: {
      fr: ["rôles des actifs", "sauvegarde et restauration", "droits et annuaire", "exposition de services"],
      en: ["asset roles", "backup and restore", "rights and directory", "service exposure"]
    }
  },
  {
    categorySlug: "opsec",
    title: { fr: "Examen débutant OpSec", en: "Beginner OpSec Exam" },
    scenario: {
      fr: "Un apprenant veut réduire son exposition sans disparaître d'Internet. Tu analyses comptes, mots de passe, MFA, navigateur, empreinte publique et messages suspects.",
      en: "A learner wants to reduce exposure without disappearing from the Internet. You analyze accounts, passwords, MFA, browser, public footprint, and suspicious messages."
    },
    focus: {
      fr: ["mots de passe et MFA", "hygiène navigateur et appareil", "phishing", "empreinte publique"],
      en: ["passwords and MFA", "browser and device hygiene", "phishing", "public footprint"]
    }
  },
  {
    categorySlug: "web-security",
    title: { fr: "Examen débutant Web Security", en: "Beginner Web Security Exam" },
    scenario: {
      fr: "Tu observes une application web de lab : connexion, formulaires, cookies, erreurs et API simple. Tu dois distinguer ce que le navigateur montre de ce que le serveur doit vérifier.",
      en: "You observe a lab web application: sign-in, forms, cookies, errors, and a simple API. You must separate what the browser shows from what the server must verify."
    },
    focus: {
      fr: ["HTTP, statuts et cookies", "validation serveur", "authentification et autorisation", "erreurs et journaux"],
      en: ["HTTP, statuses, and cookies", "server validation", "authentication and authorization", "errors and logs"]
    }
  },
  {
    categorySlug: "linux",
    title: { fr: "Examen débutant Linux", en: "Beginner Linux Exam" },
    scenario: {
      fr: "Un service de lab Linux ne répond plus. Tu dois lire le système, les permissions, les processus, les journaux et le réseau local sans modifier ce que tu ne comprends pas.",
      en: "A Linux lab service no longer responds. You must read the system, permissions, processes, logs, and local network without modifying what you do not understand."
    },
    focus: {
      fr: ["shell et lecture de fichiers", "permissions", "services et journaux", "commandes réseau utiles"],
      en: ["shell and file reading", "permissions", "services and logs", "useful network commands"]
    }
  },
  {
    categorySlug: "cryptography",
    title: { fr: "Examen débutant Cryptographie", en: "Beginner Cryptography Exam" },
    scenario: {
      fr: "Tu aides une équipe à expliquer mots de passe, hash, sel, chiffrement, signatures et certificats sans promettre des garanties magiques.",
      en: "You help a team explain passwords, hashes, salts, encryption, signatures, and certificates without promising magic guarantees."
    },
    focus: {
      fr: ["hash, sel et mots de passe", "chiffrement", "signatures et intégrité", "certificats et confiance"],
      en: ["hashing, salt, and passwords", "encryption", "signatures and integrity", "certificates and trust"]
    }
  },
  {
    categorySlug: "forensics",
    title: { fr: "Examen débutant Forensics", en: "Beginner Forensics Exam" },
    scenario: {
      fr: "Tu reçois quelques traces de lab après un événement suspect. Tu dois préserver, classer les artefacts, construire une chronologie et éviter de raconter une histoire trop vite.",
      en: "You receive a few lab traces after a suspicious event. You must preserve, classify artifacts, build a timeline, and avoid telling a story too fast."
    },
    focus: {
      fr: ["préservation", "artefacts système", "chronologie", "faits, hypothèses et confiance"],
      en: ["preservation", "system artifacts", "timeline", "facts, hypotheses, and confidence"]
    }
  },
  {
    categorySlug: "blue-team",
    title: { fr: "Examen débutant Blue Team", en: "Beginner Blue Team Exam" },
    scenario: {
      fr: "Une alerte arrive sur une application interne. Tu dois qualifier le signal, lire le contexte, choisir une décision proportionnée et préparer une escalade claire si besoin.",
      en: "An alert arrives on an internal application. You must qualify the signal, read context, choose a proportionate decision, and prepare a clear escalation if needed."
    },
    focus: {
      fr: ["journaux utiles", "triage", "première heure d'incident", "décision et escalade"],
      en: ["useful logs", "triage", "first incident hour", "decision and escalation"]
    }
  },
  {
    categorySlug: "ethical-red-team",
    title: { fr: "Examen débutant Red Team éthique", en: "Beginner Ethical Red Team Exam" },
    scenario: {
      fr: "Tu prépares un exercice offensif strictement autorisé. Le périmètre est limité, les preuves doivent rester minimales et toute cible hors cadre doit être documentée sans être testée.",
      en: "You prepare a strictly authorized offensive exercise. Scope is limited, evidence must stay minimal, and any out-of-scope target must be documented without testing."
    },
    focus: {
      fr: ["autorisation", "règles d'engagement", "preuve minimale", "rapport responsable"],
      en: ["authorization", "rules of engagement", "minimal evidence", "responsible report"]
    }
  },
  {
    categorySlug: "ctf-labs",
    title: { fr: "Examen débutant CTF / Labs", en: "Beginner CTF / Labs Exam" },
    scenario: {
      fr: "Tu démarres un lab local autorisé. Tu dois organiser ton environnement, suivre tes hypothèses, noter tes preuves et produire une courte rétrospective exploitable.",
      en: "You start an authorized local lab. You must organize your environment, track hypotheses, record evidence, and produce a short usable retrospective."
    },
    focus: {
      fr: ["périmètre de lab", "méthode CTF", "notes de preuve", "writeup et rétrospective"],
      en: ["lab scope", "CTF method", "evidence notes", "writeup and retrospective"]
    }
  }
];

function buildQuestions(input: ExamInput): ExamQuestion[] {
  const [firstFr, secondFr, thirdFr, fourthFr] = input.focus.fr;
  const [firstEn, secondEn, thirdEn, fourthEn] = input.focus.en;

  return [
    {
      question: {
        fr: `Dans ce scénario, quelle première action donne le diagnostic le plus propre ?`,
        en: "In this scenario, which first action gives the cleanest diagnosis?"
      },
      options: {
        fr: [`Lister les faits observables avant de conclure`, "Changer directement la configuration", "Chercher une solution toute faite"],
        en: ["List observable facts before concluding", "Change configuration directly", "Look for a ready-made solution"]
      },
      correctOption: 0,
      explanation: {
        fr: "Un examen professionnel attend d'abord une séparation nette entre faits, hypothèses et décision.",
        en: "A professional exam first expects a clear separation between facts, hypotheses, and decision."
      }
    },
    {
      question: {
        fr: `Quel élément valide le mieux le thème : ${firstFr} ?`,
        en: `Which element best validates the theme: ${firstEn}?`
      },
      options: {
        fr: ["Une preuve contextualisée et reproductible", "Une intuition non documentée", "Une capture sans explication"],
        en: ["Contextualized and reproducible evidence", "Undocumented intuition", "A screenshot without explanation"]
      },
      correctOption: 0,
      explanation: {
        fr: "La preuve doit pouvoir être relue par quelqu'un d'autre sans deviner ton raisonnement.",
        en: "Evidence must be readable by someone else without guessing your reasoning."
      }
    },
    {
      question: {
        fr: `Tu hésites entre deux hypothèses sur ${secondFr}. Que fais-tu ?`,
        en: `You hesitate between two hypotheses about ${secondEn}. What do you do?`
      },
      options: {
        fr: ["Tu choisis une vérification limitée qui distingue les deux", "Tu gardes celle qui semble la plus spectaculaire", "Tu ignores l'incertitude"],
        en: ["Choose a limited check that separates both", "Keep the most spectacular one", "Ignore uncertainty"]
      },
      correctOption: 0,
      explanation: {
        fr: "Une bonne vérification réduit l'incertitude sans élargir le périmètre ni créer de risque inutile.",
        en: "A good verification reduces uncertainty without expanding scope or creating needless risk."
      }
    },
    {
      question: {
        fr: `Quel comportement serait éliminatoire dans un examen sérieux ?`,
        en: "Which behavior should be disqualifying in a serious exam?"
      },
      options: {
        fr: ["Tester hors périmètre ou masquer une action", "Documenter une limite", "Demander une clarification"],
        en: ["Testing out of scope or hiding an action", "Documenting a limit", "Asking for clarification"]
      },
      correctOption: 0,
      explanation: {
        fr: "La posture responsable compte autant que la réponse technique.",
        en: "Responsible posture matters as much as the technical answer."
      }
    },
    {
      question: {
        fr: `Pour ${thirdFr}, quelle conclusion est la plus professionnelle ?`,
        en: `For ${thirdEn}, which conclusion is most professional?`
      },
      options: {
        fr: ["Fait observé, hypothèse, confiance, prochaine vérification", "Certitude totale sans preuve", "Conclusion vague pour rester flexible"],
        en: ["Observed fact, hypothesis, confidence, next check", "Total certainty without evidence", "Vague conclusion for flexibility"]
      },
      correctOption: 0,
      explanation: {
        fr: "La structure fait, hypothèse, confiance et prochaine action protège contre la surinterprétation.",
        en: "The fact, hypothesis, confidence, and next action structure prevents overinterpretation."
      }
    },
    {
      question: {
        fr: `Comment prouver que tu maîtrises ${fourthFr} ?`,
        en: `How do you prove you understand ${fourthEn}?`
      },
      options: {
        fr: ["En produisant une note courte, vérifiable et actionnable", "En écrivant beaucoup de jargon", "En donnant seulement le résultat final"],
        en: ["By producing a short, verifiable, actionable note", "By writing lots of jargon", "By giving only the final result"]
      },
      correctOption: 0,
      explanation: {
        fr: "L'objectif est de montrer une compétence exploitable, pas une récitation.",
        en: "The goal is showing usable skill, not recitation."
      }
    },
    {
      question: {
        fr: "Quelle réponse doit déclencher un échec automatique ?",
        en: "Which answer should trigger an automatic fail?"
      },
      options: {
        fr: ["Supprimer des traces pour simplifier le rapport", "Préserver les preuves disponibles", "Expliquer ce qui manque"],
        en: ["Delete traces to simplify the report", "Preserve available evidence", "Explain what is missing"]
      },
      correctOption: 0,
      explanation: {
        fr: "Supprimer ou cacher une trace est incompatible avec une validation professionnelle.",
        en: "Deleting or hiding a trace is incompatible with professional validation."
      }
    },
    {
      question: {
        fr: "Quel livrable final est attendu ?",
        en: "What final deliverable is expected?"
      },
      options: {
        fr: ["Une synthèse : contexte, preuves, décision, limites", "Une liste d'outils sans justification", "Une réponse en une ligne sans contexte"],
        en: ["A summary: context, evidence, decision, limits", "A tool list without justification", "A one-line answer without context"]
      },
      correctOption: 0,
      explanation: {
        fr: "Le livrable doit aider une autre personne à comprendre et poursuivre proprement.",
        en: "The deliverable must help another person understand and continue cleanly."
      }
    }
  ];
}

function buildTasks(input: ExamInput): ExamTask[] {
  return [
    {
      title: { fr: "Diagnostic écrit", en: "Written diagnosis" },
      prompt: {
        fr: `Rédige une note de 8 à 10 lignes sur le scénario. Elle doit couvrir : ${input.focus.fr.join(", ")}.`,
        en: `Write an 8 to 10 line note about the scenario. It must cover: ${input.focus.en.join(", ")}.`
      },
      rubric: {
        fr: ["Sépare faits et hypothèses", "Indique au moins deux preuves", "Propose une vérification limitée", "Mentionne une limite ou un risque"],
        en: ["Separates facts and hypotheses", "States at least two proofs", "Proposes one limited verification", "Mentions one limit or risk"]
      }
    },
    {
      title: { fr: "Décision de validation", en: "Validation decision" },
      prompt: {
        fr: "Écris la décision finale : validé, à revoir ou bloqué. Justifie avec les preuves, le niveau de confiance et la prochaine action.",
        en: "Write the final decision: validated, to review, or blocked. Justify with evidence, confidence level, and next action."
      },
      rubric: {
        fr: ["Décision claire", "Justification par preuve", "Niveau de confiance", "Prochaine action responsable"],
        en: ["Clear decision", "Evidence-based justification", "Confidence level", "Responsible next action"]
      }
    }
  ];
}

const specificQuestions: Record<string, ExamQuestion[]> = {
  network: [
    {
      question: { fr: "Un poste en /24 veut joindre une adresse dans un autre /24. Quelle preuve cherches-tu d'abord ?", en: "A /24 host wants to reach an address in another /24. Which proof do you seek first?" },
      options: { fr: ["Passerelle et route vers l'autre réseau", "Bannière du service web", "Nom commercial du navigateur"], en: ["Gateway and route to the other network", "Web service banner", "Browser brand name"] },
      correctOption: 0,
      explanation: { fr: "Avant le service, il faut prouver que le chemin réseau existe.", en: "Before the service, prove the network path exists." }
    }
  ],
  "hardware-infrastructure": [
    {
      question: { fr: "Une sauvegarde existe, mais aucune restauration n'a été testée. Quelle conclusion est juste ?", en: "A backup exists, but no restore was tested. Which conclusion is right?" },
      options: { fr: ["La copie existe, mais la reprise n'est pas prouvée", "Tout est garanti", "L'inventaire devient inutile"], en: ["The copy exists, but recovery is not proven", "Everything is guaranteed", "Inventory becomes useless"] },
      correctOption: 0,
      explanation: { fr: "Une sauvegarde sérieuse se valide par une restauration testée.", en: "A serious backup is validated by a tested restore." }
    }
  ],
  opsec: [
    {
      question: { fr: "Un message urgent demande une connexion. Quelle action est saine ?", en: "An urgent message asks for sign-in. What is the healthy action?" },
      options: { fr: ["Vérifier par un canal indépendant", "Cliquer vite", "Répondre avec ses identifiants"], en: ["Verify through an independent channel", "Click quickly", "Reply with credentials"] },
      correctOption: 0,
      explanation: { fr: "L'urgence est un signal à qualifier, pas une raison de cliquer.", en: "Urgency is a signal to qualify, not a reason to click." }
    }
  ],
  "web-security": [
    {
      question: { fr: "Un champ role=admin est ajouté à une requête. Que doit faire le serveur ?", en: "A role=admin field is added to a request. What should the server do?" },
      options: { fr: ["Ignorer ou refuser le champ non autorisé", "Créer un admin", "Faire confiance au navigateur"], en: ["Ignore or reject the unauthorized field", "Create an admin", "Trust the browser"] },
      correctOption: 0,
      explanation: { fr: "Le client ne décide jamais des droits serveur.", en: "The client never decides server-side rights." }
    }
  ],
  linux: [
    {
      question: { fr: "Un service Linux ne démarre plus. Que fais-tu avant de modifier ?", en: "A Linux service no longer starts. What do you do before modifying?" },
      options: { fr: ["Lire état, journaux, permissions et dernier changement", "Passer les droits en 777", "Supprimer les journaux"], en: ["Read state, logs, permissions, and last change", "Set permissions to 777", "Delete logs"] },
      correctOption: 0,
      explanation: { fr: "Observer avant modifier évite d'ajouter une panne à la panne.", en: "Observe before modifying to avoid adding failure to failure." }
    }
  ],
  cryptography: [
    {
      question: { fr: "Un hash de mot de passe doit-il être déchiffrable ?", en: "Should a password hash be decryptable?" },
      options: { fr: ["Non, on vérifie en recalculant", "Oui, sinon on ne peut pas se connecter", "Seulement en admin"], en: ["No, verify by recomputing", "Yes, otherwise sign-in is impossible", "Only as admin"] },
      correctOption: 0,
      explanation: { fr: "Un hash n'est pas un chiffrement réversible.", en: "A hash is not reversible encryption." }
    }
  ],
  forensics: [
    {
      question: { fr: "Trois journaux ont des fuseaux horaires différents. Quelle action est correcte ?", en: "Three logs have different time zones. Which action is correct?" },
      options: { fr: ["Normaliser les heures et noter l'incertitude", "Choisir l'heure qui arrange", "Supprimer deux journaux"], en: ["Normalize times and record uncertainty", "Choose the convenient time", "Delete two logs"] },
      correctOption: 0,
      explanation: { fr: "Sans normalisation, la chronologie peut devenir fausse.", en: "Without normalization, the timeline can become false." }
    }
  ],
  "blue-team": [
    {
      question: { fr: "Une alerte est d'abord quoi ?", en: "What is an alert first?" },
      options: { fr: ["Un signal à qualifier", "Une compromission certaine", "Un bruit à supprimer"], en: ["A signal to qualify", "A certain compromise", "Noise to delete"] },
      correctOption: 0,
      explanation: { fr: "Le triage transforme un signal en décision documentée.", en: "Triage turns a signal into a documented decision." }
    }
  ],
  "ethical-red-team": [
    {
      question: { fr: "Tu découvres une cible proche mais hors périmètre. Que fais-tu ?", en: "You discover a nearby but out-of-scope target. What do you do?" },
      options: { fr: ["Tu notes et demandes clarification sans tester", "Tu testes vite", "Tu l'ignores dans le rapport"], en: ["Document and ask clarification without testing", "Test quickly", "Ignore it in the report"] },
      correctOption: 0,
      explanation: { fr: "Hors périmètre signifie hors action.", en: "Out of scope means out of action." }
    }
  ],
  "ctf-labs": [
    {
      question: { fr: "Une note CTF utile garde quoi ?", en: "What does a useful CTF note keep?" },
      options: { fr: ["Objectif, hypothèse, action, observation, conclusion", "Seulement la commande finale", "Seulement le flag"], en: ["Goal, hypothesis, action, observation, conclusion", "Only the final command", "Only the flag"] },
      correctOption: 0,
      explanation: { fr: "L'apprentissage est dans le chemin, pas seulement le résultat.", en: "Learning is in the path, not only the result." }
    }
  ]
};

export const beginnerExams: BeginnerExam[] = examInputs.map((input) => ({
  categorySlug: input.categorySlug,
  durationMinutes: 45,
  passingScore: 80,
  questions: [...buildQuestions(input), ...(specificQuestions[input.categorySlug] ?? [])],
  scenario: input.scenario,
  tasks: buildTasks(input),
  title: input.title
}));

export function getBeginnerExam(categorySlug: string) {
  return beginnerExams.find((exam) => exam.categorySlug === categorySlug);
}

export function getBeginnerExamRequirement(categorySlug: string) {
  const beginnerCourses = getCoursesByCategory(categorySlug).filter((course) => course.level === "beginner");

  return {
    courseSlugs: beginnerCourses.map((course) => course.slug),
    total: beginnerCourses.length
  };
}

export function getBeginnerExamStaticParams() {
  return categories.map((category) => ({ categorySlug: category.slug }));
}
