import type { Locale } from "@/lib/i18n-client";

export type Level = "beginner" | "intermediate" | "advanced";

export type Category = {
  slug: string;
  icon: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  color: "mint" | "amber" | "coral";
};

export type QuizQuestion = {
  question: string;
  options: string[];
  correctOption: number;
};

export type Course = {
  slug: string;
  categorySlug: string;
  level: Level;
  isPremium: boolean;
  estimatedMinutes: number;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  objectives: Record<Locale, string[]>;
  prerequisites: Record<Locale, string[]>;
  sections: Record<Locale, { title: string; body: string }[]>;
  resources: Record<Locale, { label: string; url: string }[]>;
  exercises: Record<Locale, { title: string; body: string; premium?: boolean }[]>;
  quiz: Record<Locale, QuizQuestion[]>;
};

export const categories: Category[] = [
  {
    slug: "network",
    icon: "Route",
    title: { fr: "Réseau", en: "Networking" },
    description: {
      fr: "Protocoles, segmentation, routage, captures et diagnostic défensif.",
      en: "Protocols, segmentation, routing, packet captures, and defensive diagnostics."
    },
    color: "mint"
  },
  {
    slug: "hardware-infrastructure",
    icon: "Server",
    title: { fr: "Hardware / Infrastructure", en: "Hardware / Infrastructure" },
    description: {
      fr: "Systèmes, serveurs, services, durcissement et résilience locale.",
      en: "Systems, servers, services, hardening, and local resilience."
    },
    color: "amber"
  },
  {
    slug: "opsec",
    icon: "Fingerprint",
    title: { fr: "OpSec / Empreinte numérique", en: "OpSec / Digital footprint" },
    description: {
      fr: "Hygiène numérique, exposition publique, confidentialité et réduction de traces.",
      en: "Digital hygiene, public exposure, privacy, and trace reduction."
    },
    color: "coral"
  },
  {
    slug: "web-security",
    icon: "GlobeLock",
    title: { fr: "Web Security", en: "Web Security" },
    description: {
      fr: "HTTP, authentification, vulnérabilités courantes et défense applicative.",
      en: "HTTP, authentication, common vulnerabilities, and application defense."
    },
    color: "mint"
  },
  {
    slug: "linux",
    icon: "Terminal",
    title: { fr: "Linux", en: "Linux" },
    description: {
      fr: "Shell, permissions, services, logs, durcissement et automatisation.",
      en: "Shell, permissions, services, logs, hardening, and automation."
    },
    color: "amber"
  },
  {
    slug: "cryptography",
    icon: "KeyRound",
    title: { fr: "Cryptographie", en: "Cryptography" },
    description: {
      fr: "Concepts, usages, limites, signatures, chiffrement et erreurs fréquentes.",
      en: "Concepts, usage, limits, signatures, encryption, and common mistakes."
    },
    color: "coral"
  },
  {
    slug: "forensics",
    icon: "Search",
    title: { fr: "Forensics", en: "Forensics" },
    description: {
      fr: "Collecte, chronologie, artefacts, analyse et préservation de preuves.",
      en: "Collection, timelines, artifacts, analysis, and evidence preservation."
    },
    color: "mint"
  },
  {
    slug: "blue-team",
    icon: "Shield",
    title: { fr: "Blue Team", en: "Blue Team" },
    description: {
      fr: "Détection, supervision, réponse à incident et amélioration continue.",
      en: "Detection, monitoring, incident response, and continuous improvement."
    },
    color: "amber"
  },
  {
    slug: "ethical-red-team",
    icon: "Crosshair",
    title: { fr: "Red Team éthique", en: "Ethical Red Team" },
    description: {
      fr: "Méthodologie autorisée, cadrage, reporting et labs contrôlés.",
      en: "Authorized methodology, scoping, reporting, and controlled labs."
    },
    color: "coral"
  },
  {
    slug: "ctf-labs",
    icon: "Flag",
    title: { fr: "CTF / Labs", en: "CTF / Labs" },
    description: {
      fr: "Défis isolés, validation de compétences et entraînement reproductible.",
      en: "Isolated challenges, skill validation, and reproducible practice."
    },
    color: "mint"
  }
];

export const courses: Course[] = [
  {
    slug: "network-map-first-steps",
    categorySlug: "network",
    level: "beginner",
    isPremium: false,
    estimatedMinutes: 35,
    title: { fr: "Lire un réseau avant d'agir", en: "Read a network before acting" },
    summary: {
      fr: "Comprendre adresses, ports, flux et périmètre autorisé avant tout diagnostic.",
      en: "Understand addresses, ports, flows, and authorized scope before any diagnostic."
    },
    objectives: {
      fr: ["Identifier les rôles des hôtes", "Relier ports et services", "Distinguer observation et test actif"],
      en: ["Identify host roles", "Connect ports to services", "Separate observation from active testing"]
    },
    prerequisites: {
      fr: ["Bases TCP/IP", "Accès à un lab local ou une VM autorisée"],
      en: ["TCP/IP basics", "Access to a local lab or authorized VM"]
    },
    sections: {
      fr: [
        {
          title: "Cadre autorisé",
          body: "Un diagnostic réseau commence par un périmètre clair. HardenPath privilégie l'observation, la documentation et les environnements explicitement autorisés."
        },
        {
          title: "Lecture progressive",
          body: "On part des adresses, puis des noms, des ports, des services et des journaux. Chaque étape doit produire une hypothèse vérifiable."
        }
      ],
      en: [
        {
          title: "Authorized scope",
          body: "Network diagnostics start with a clear scope. HardenPath favors observation, documentation, and explicitly authorized environments."
        },
        {
          title: "Progressive reading",
          body: "Start with addresses, then names, ports, services, and logs. Each step should produce a verifiable hypothesis."
        }
      ]
    },
    resources: {
      fr: [{ label: "RFC 9110 - HTTP Semantics", url: "https://www.rfc-editor.org/rfc/rfc9110" }],
      en: [{ label: "RFC 9110 - HTTP Semantics", url: "https://www.rfc-editor.org/rfc/rfc9110" }]
    },
    exercises: {
      fr: [
        { title: "Inventaire lab", body: "Liste trois machines de ton lab, leur rôle supposé et les flux attendus." },
        { title: "Carte de service", body: "Relie chaque port observé à un service attendu et note l'incertitude restante.", premium: true }
      ],
      en: [
        { title: "Lab inventory", body: "List three lab machines, their expected role, and expected flows." },
        { title: "Service map", body: "Map each observed port to an expected service and note remaining uncertainty.", premium: true }
      ]
    },
    quiz: {
      fr: [
        {
          question: "Quelle est la première étape responsable avant un test actif ?",
          options: ["Définir le périmètre autorisé", "Scanner Internet", "Publier les résultats"],
          correctOption: 0
        }
      ],
      en: [
        {
          question: "What is the responsible first step before active testing?",
          options: ["Define authorized scope", "Scan the Internet", "Publish results"],
          correctOption: 0
        }
      ]
    }
  },
  {
    slug: "web-auth-foundations",
    categorySlug: "web-security",
    level: "beginner",
    isPremium: false,
    estimatedMinutes: 45,
    title: { fr: "Fondations de l'authentification web", en: "Web authentication foundations" },
    summary: {
      fr: "Sessions, cookies, mots de passe, MFA et erreurs de conception fréquentes.",
      en: "Sessions, cookies, passwords, MFA, and common design mistakes."
    },
    objectives: {
      fr: ["Expliquer le rôle d'un cookie de session", "Reconnaître les risques de stockage", "Préparer une checklist défensive"],
      en: ["Explain the role of a session cookie", "Recognize storage risks", "Prepare a defensive checklist"]
    },
    prerequisites: {
      fr: ["Bases HTTP", "Compréhension d'un formulaire web"],
      en: ["HTTP basics", "Understanding of a web form"]
    },
    sections: {
      fr: [
        {
          title: "Session et identité",
          body: "Une application ne doit jamais confondre authentification, autorisation et preuve de possession. Chaque couche mérite un contrôle distinct."
        }
      ],
      en: [
        {
          title: "Session and identity",
          body: "An application should never confuse authentication, authorization, and proof of possession. Each layer deserves its own control."
        }
      ]
    },
    resources: {
      fr: [{ label: "OWASP Authentication Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html" }],
      en: [{ label: "OWASP Authentication Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html" }]
    },
    exercises: {
      fr: [{ title: "Checklist défensive", body: "Écris cinq contrôles attendus pour un système d'authentification local." }],
      en: [{ title: "Defensive checklist", body: "Write five expected controls for a local authentication system." }]
    },
    quiz: {
      fr: [
        {
          question: "Où doit être stocké un mot de passe utilisateur côté serveur ?",
          options: ["En clair", "Haché avec un algorithme adapté", "Dans un cookie public"],
          correctOption: 1
        }
      ],
      en: [
        {
          question: "How should a user password be stored server-side?",
          options: ["In plain text", "Hashed with a suitable algorithm", "In a public cookie"],
          correctOption: 1
        }
      ]
    }
  },
  {
    slug: "linux-service-hardening",
    categorySlug: "linux",
    level: "intermediate",
    isPremium: true,
    estimatedMinutes: 60,
    title: { fr: "Durcir un service Linux local", en: "Harden a local Linux service" },
    summary: {
      fr: "Permissions, utilisateur dédié, journaux, pare-feu local et reprise contrôlée.",
      en: "Permissions, dedicated user, logs, local firewall, and controlled recovery."
    },
    objectives: {
      fr: ["Créer une stratégie de moindre privilège", "Lire les journaux utiles", "Préparer un rollback"],
      en: ["Create a least-privilege strategy", "Read useful logs", "Prepare rollback"]
    },
    prerequisites: {
      fr: ["Shell Linux", "Accès administrateur à une VM de test"],
      en: ["Linux shell", "Admin access to a test VM"]
    },
    sections: {
      fr: [
        {
          title: "Moindre privilège",
          body: "Un service durci limite ce qu'il peut lire, écrire et exposer. Les permissions doivent refléter le besoin réel, pas la facilité."
        }
      ],
      en: [
        {
          title: "Least privilege",
          body: "A hardened service limits what it can read, write, and expose. Permissions should reflect actual need, not convenience."
        }
      ]
    },
    resources: {
      fr: [{ label: "systemd Security Features", url: "https://www.freedesktop.org/software/systemd/man/latest/systemd.exec.html" }],
      en: [{ label: "systemd Security Features", url: "https://www.freedesktop.org/software/systemd/man/latest/systemd.exec.html" }]
    },
    exercises: {
      fr: [{ title: "Profil de service", body: "Décris l'utilisateur, les répertoires et les journaux nécessaires à un service de lab.", premium: true }],
      en: [{ title: "Service profile", body: "Describe the user, directories, and logs required by a lab service.", premium: true }]
    },
    quiz: {
      fr: [
        {
          question: "Quel principe réduit l'impact d'un service compromis ?",
          options: ["Moindre privilège", "Mot de passe partagé", "Journaux désactivés"],
          correctOption: 0
        }
      ],
      en: [
        {
          question: "Which principle reduces the impact of a compromised service?",
          options: ["Least privilege", "Shared password", "Disabled logs"],
          correctOption: 0
        }
      ]
    }
  },
  {
    slug: "ctf-evidence-notes",
    categorySlug: "ctf-labs",
    level: "beginner",
    isPremium: false,
    estimatedMinutes: 25,
    title: { fr: "Prendre des notes de lab exploitables", en: "Take useful lab notes" },
    summary: {
      fr: "Transformer un défi CTF en preuve d'apprentissage reproductible.",
      en: "Turn a CTF challenge into reproducible evidence of learning."
    },
    objectives: {
      fr: ["Structurer hypothèses et preuves", "Séparer commandes, résultats et conclusions", "Préparer une validation"],
      en: ["Structure hypotheses and evidence", "Separate commands, results, and conclusions", "Prepare validation"]
    },
    prerequisites: {
      fr: ["Un défi de lab isolé", "Un carnet de notes"],
      en: ["An isolated lab challenge", "A notebook"]
    },
    sections: {
      fr: [
        {
          title: "Preuve et reproductibilité",
          body: "Une bonne note explique ce qui a été testé, pourquoi, dans quel environnement, et comment revenir à l'état initial."
        }
      ],
      en: [
        {
          title: "Evidence and reproducibility",
          body: "A good note explains what was tested, why, in which environment, and how to return to the initial state."
        }
      ]
    },
    resources: {
      fr: [{ label: "NIST NICE Framework", url: "https://www.nist.gov/itl/applied-cybersecurity/nice" }],
      en: [{ label: "NIST NICE Framework", url: "https://www.nist.gov/itl/applied-cybersecurity/nice" }]
    },
    exercises: {
      fr: [{ title: "Journal de lab", body: "Rédige une note courte avec contexte, action, observation, conclusion et prochaine étape." }],
      en: [{ title: "Lab journal", body: "Write a short note with context, action, observation, conclusion, and next step." }]
    },
    quiz: {
      fr: [
        {
          question: "Quel élément rend une note de lab plus utile ?",
          options: ["La reproductibilité", "Le secret complet", "L'absence de contexte"],
          correctOption: 0
        }
      ],
      en: [
        {
          question: "What makes a lab note more useful?",
          options: ["Reproducibility", "Total secrecy", "No context"],
          correctOption: 0
        }
      ]
    }
  }
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export function getCoursesByCategory(categorySlug: string) {
  return courses.filter((course) => course.categorySlug === categorySlug);
}
