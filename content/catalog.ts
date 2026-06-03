import type { Locale } from "@/lib/i18n-client";

export type Level = "beginner" | "intermediate" | "advanced";

export type Category = {
  slug: string;
  icon: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  color: "mint" | "amber" | "coral";
};

export type Prerequisite = {
  label: string;
  courseSlug?: string;
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
  prerequisites: Record<Locale, Prerequisite[]>;
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
      fr: "Protocoles, adressage, flux, segmentation et diagnostic défensif.",
      en: "Protocols, addressing, flows, segmentation, and defensive diagnostics."
    },
    color: "mint"
  },
  {
    slug: "hardware-infrastructure",
    icon: "Server",
    title: { fr: "Hardware / Infrastructure", en: "Hardware / Infrastructure" },
    description: {
      fr: "Machines, services, sauvegardes, exposition et durcissement.",
      en: "Machines, services, backups, exposure, and hardening."
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
      fr: "HTTP, formulaires, sessions, authentification et défense applicative.",
      en: "HTTP, forms, sessions, authentication, and application defense."
    },
    color: "mint"
  },
  {
    slug: "linux",
    icon: "Terminal",
    title: { fr: "Linux", en: "Linux" },
    description: {
      fr: "Shell, permissions, services, journaux, durcissement et exploitation quotidienne.",
      en: "Shell, permissions, services, logs, hardening, and daily operations."
    },
    color: "amber"
  },
  {
    slug: "cryptography",
    icon: "KeyRound",
    title: { fr: "Cryptographie", en: "Cryptography" },
    description: {
      fr: "Hash, chiffrement, signatures, mots de passe et erreurs courantes.",
      en: "Hashing, encryption, signatures, passwords, and common mistakes."
    },
    color: "coral"
  },
  {
    slug: "forensics",
    icon: "Search",
    title: { fr: "Forensics", en: "Forensics" },
    description: {
      fr: "Collecte, chronologie, artefacts, journaux et préservation de preuves.",
      en: "Collection, timelines, artifacts, logs, and evidence preservation."
    },
    color: "mint"
  },
  {
    slug: "blue-team",
    icon: "Shield",
    title: { fr: "Blue Team", en: "Blue Team" },
    description: {
      fr: "Détection, triage, réponse à incident et amélioration continue.",
      en: "Detection, triage, incident response, and continuous improvement."
    },
    color: "amber"
  },
  {
    slug: "ethical-red-team",
    icon: "Crosshair",
    title: { fr: "Red Team éthique", en: "Ethical Red Team" },
    description: {
      fr: "Cadrage, autorisation, preuves, reporting et laboratoires contrôlés.",
      en: "Scoping, authorization, evidence, reporting, and controlled labs."
    },
    color: "coral"
  },
  {
    slug: "ctf-labs",
    icon: "Flag",
    title: { fr: "CTF / Labs", en: "CTF / Labs" },
    description: {
      fr: "Défis isolés, méthode de résolution et validation de compétences.",
      en: "Isolated challenges, resolution method, and skill validation."
    },
    color: "mint"
  }
];

const noPrereq = {
  fr: [{ label: "Aucun pré requis" }],
  en: [{ label: "No prerequisite" }]
};

export const courses: Course[] = [
  {
    slug: "tcpip-basics",
    categorySlug: "network",
    level: "beginner",
    isPremium: false,
    estimatedMinutes: 55,
    title: { fr: "Bases TCP/IP pour lire un réseau", en: "TCP/IP basics for reading a network" },
    summary: {
      fr: "Comprendre adresses IP, ports, protocoles, sous-réseaux et échanges client/serveur.",
      en: "Understand IP addresses, ports, protocols, subnets, and client/server exchanges."
    },
    objectives: {
      fr: ["Lire une adresse IPv4 et un masque", "Différencier TCP, UDP et ICMP", "Relier un port à un service attendu"],
      en: ["Read an IPv4 address and mask", "Differentiate TCP, UDP, and ICMP", "Map a port to an expected service"]
    },
    prerequisites: noPrereq,
    sections: {
      fr: [
        {
          title: "Adresse, réseau et hôte",
          body: "Une adresse IPv4 identifie une interface, pas une personne ni une machine entière. Le masque indique quelle partie représente le réseau. Par exemple, 192.168.10.42/24 appartient au réseau 192.168.10.0 et peut joindre directement les adresses du même segment avant de passer par une passerelle."
        },
        {
          title: "Ports et services",
          body: "Un port décrit une porte logique sur une machine. Un serveur web écoute souvent sur 80 ou 443, SSH sur 22, DNS sur 53. Le port n'est pas une preuve absolue : il donne une hypothèse à vérifier avec le contexte, les bannières, les journaux ou la configuration."
        },
        {
          title: "TCP, UDP, ICMP",
          body: "TCP établit une session et confirme les échanges. UDP envoie sans session persistante, utile pour DNS ou certains flux temps réel. ICMP sert surtout au diagnostic réseau. Savoir quel protocole porte un échange aide à choisir la bonne observation."
        },
        {
          title: "Méthode de lecture",
          body: "Quand tu observes un réseau, note d'abord l'adresse source, l'adresse destination, le protocole, le port et le rôle supposé. Tu obtiens une phrase simple : 'ce client interroge ce service pour cette raison probable'."
        }
      ],
      en: [
        {
          title: "Address, network, host",
          body: "An IPv4 address identifies an interface, not a person or an entire machine. The mask tells which part represents the network. For example, 192.168.10.42/24 belongs to network 192.168.10.0 and can directly reach addresses on that segment before using a gateway."
        },
        {
          title: "Ports and services",
          body: "A port is a logical door on a machine. Web servers often listen on 80 or 443, SSH on 22, DNS on 53. A port is not proof by itself: it gives a hypothesis to verify through context, banners, logs, or configuration."
        },
        {
          title: "TCP, UDP, ICMP",
          body: "TCP establishes a session and confirms exchanges. UDP sends without a persistent session, useful for DNS or some real-time flows. ICMP is mostly used for diagnostics. Knowing the protocol helps choose the right observation."
        },
        {
          title: "Reading method",
          body: "When observing a network, first record source address, destination address, protocol, port, and expected role. You get a simple sentence: 'this client queries this service for this likely reason'."
        }
      ]
    },
    resources: {
      fr: [{ label: "RFC 791 - Internet Protocol", url: "https://www.rfc-editor.org/rfc/rfc791" }],
      en: [{ label: "RFC 791 - Internet Protocol", url: "https://www.rfc-editor.org/rfc/rfc791" }]
    },
    exercises: {
      fr: [
        { title: "Lecture d'adresse", body: "Pour 10.20.30.44/24, indique le réseau, l'hôte, la passerelle probable si elle existe, et ce que tu ne peux pas déduire." },
        { title: "Table ports/services", body: "Crée une table avec 22, 53, 80, 123, 443 et associe chaque port à un service, un protocole probable et une question de validation." }
      ],
      en: [
        { title: "Address reading", body: "For 10.20.30.44/24, identify the network, host, likely gateway if any, and what you cannot infer." },
        { title: "Ports/services table", body: "Create a table with 22, 53, 80, 123, 443 and map each port to a service, likely protocol, and validation question." }
      ]
    },
    quiz: {
      fr: [
        { question: "Que signifie le /24 dans 192.168.1.50/24 ?", options: ["La taille de la partie réseau", "Le port du service", "Le nombre de machines connectées"], correctOption: 0 },
        { question: "Quel protocole établit une session avec accusés de réception ?", options: ["TCP", "UDP", "ARP"], correctOption: 0 },
        { question: "Un port ouvert prouve-t-il le service exact ?", options: ["Non, il donne une hypothèse à vérifier", "Oui, toujours", "Seulement sur Linux"], correctOption: 0 }
      ],
      en: [
        { question: "What does /24 mean in 192.168.1.50/24?", options: ["The size of the network part", "The service port", "The number of connected machines"], correctOption: 0 },
        { question: "Which protocol establishes a session with acknowledgements?", options: ["TCP", "UDP", "ARP"], correctOption: 0 },
        { question: "Does an open port prove the exact service?", options: ["No, it gives a hypothesis to verify", "Yes, always", "Only on Linux"], correctOption: 0 }
      ]
    }
  },
  {
    slug: "local-lab-vm-setup",
    categorySlug: "ctf-labs",
    level: "beginner",
    isPremium: false,
    estimatedMinutes: 45,
    title: { fr: "Préparer un laboratoire local autorisé", en: "Prepare an authorized local lab" },
    summary: {
      fr: "Installer une zone d'entraînement isolée, documentée et sûre avant les exercices pratiques.",
      en: "Set up an isolated, documented, and safe training area before practical exercises."
    },
    objectives: {
      fr: ["Définir le périmètre du lab", "Isoler les machines d'entraînement", "Créer un journal de lab"],
      en: ["Define lab scope", "Isolate training machines", "Create a lab journal"]
    },
    prerequisites: noPrereq,
    sections: {
      fr: [
        { title: "Périmètre", body: "Un lab commence par une phrase claire : quelles machines sont concernées, qui les possède, quelles actions sont autorisées, et quand arrêter. Sans cette phrase, l'exercice n'est pas cadré." },
        { title: "Isolement", body: "Utilise des VM, un réseau local dédié ou des environnements CTF. Évite de mélanger machines personnelles, services exposés et exercices de sécurité. Un bon lab doit pouvoir être remis à zéro." },
        { title: "Journal", body: "Chaque séance note la date, l'objectif, les machines utilisées, les actions réalisées, les observations et la conclusion. Ce journal transforme l'exercice en compétence réutilisable." }
      ],
      en: [
        { title: "Scope", body: "A lab starts with a clear sentence: which machines are involved, who owns them, which actions are allowed, and when to stop. Without this sentence, the exercise is not scoped." },
        { title: "Isolation", body: "Use VMs, a dedicated local network, or CTF environments. Avoid mixing personal machines, exposed services, and security exercises. A good lab can be reset." },
        { title: "Journal", body: "Each session records date, goal, machines used, actions performed, observations, and conclusion. This journal turns practice into reusable skill." }
      ]
    },
    resources: {
      fr: [{ label: "VirtualBox Documentation", url: "https://www.virtualbox.org/manual/" }],
      en: [{ label: "VirtualBox Documentation", url: "https://www.virtualbox.org/manual/" }]
    },
    exercises: {
      fr: [{ title: "Fiche lab", body: "Rédige une fiche avec périmètre, machines, règles d'arrêt, méthode de reset et journal prévu." }],
      en: [{ title: "Lab sheet", body: "Write a sheet with scope, machines, stop rules, reset method, and planned journal." }]
    },
    quiz: {
      fr: [
        { question: "Pourquoi isoler un lab ?", options: ["Pour limiter l'impact des erreurs", "Pour aller plus vite sur Internet", "Pour éviter de documenter"], correctOption: 0 },
        { question: "Quel élément doit être défini avant un exercice ?", options: ["Le périmètre autorisé", "Une cible aléatoire", "Un résultat garanti"], correctOption: 0 }
      ],
      en: [
        { question: "Why isolate a lab?", options: ["To limit the impact of mistakes", "To go faster on the Internet", "To avoid documentation"], correctOption: 0 },
        { question: "What must be defined before an exercise?", options: ["Authorized scope", "A random target", "A guaranteed result"], correctOption: 0 }
      ]
    }
  },
  {
    slug: "network-map-first-steps",
    categorySlug: "network",
    level: "beginner",
    isPremium: false,
    estimatedMinutes: 70,
    title: { fr: "Lire un réseau avant d'agir", en: "Read a network before acting" },
    summary: {
      fr: "Construire une carte fiable des hôtes, flux, services et zones avant tout diagnostic actif.",
      en: "Build a reliable map of hosts, flows, services, and zones before any active diagnostic."
    },
    objectives: {
      fr: ["Identifier les rôles des hôtes", "Relier ports, flux et services", "Produire une carte exploitable"],
      en: ["Identify host roles", "Connect ports, flows, and services", "Produce an actionable map"]
    },
    prerequisites: {
      fr: [
        { label: "Bases TCP/IP", courseSlug: "tcpip-basics" },
        { label: "Laboratoire local autorisé", courseSlug: "local-lab-vm-setup" }
      ],
      en: [
        { label: "TCP/IP basics", courseSlug: "tcpip-basics" },
        { label: "Authorized local lab", courseSlug: "local-lab-vm-setup" }
      ]
    },
    sections: {
      fr: [
        { title: "Observer avant tester", body: "Commence par ce que tu peux voir sans perturber : plan d'adressage, noms d'hôtes, interfaces, journaux, services attendus. Le but n'est pas de trouver une faille, mais de comprendre le terrain." },
        { title: "Classifier les hôtes", body: "Classe chaque machine en rôle probable : poste client, serveur applicatif, DNS, passerelle, stockage, supervision. Ajoute une colonne 'confiance' pour éviter de transformer une supposition en certitude." },
        { title: "Lire les flux", body: "Un flux utile contient source, destination, protocole, port, fréquence et raison probable. Si tu ne peux pas expliquer pourquoi un flux existe, il mérite une note ou une vérification." },
        { title: "Carte minimale", body: "Une carte de réseau n'a pas besoin d'être belle. Elle doit être vérifiable : zones, machines, services, flux principaux, inconnues et prochaine action." }
      ],
      en: [
        { title: "Observe before testing", body: "Start with what you can see without disruption: addressing plan, hostnames, interfaces, logs, expected services. The goal is not to find a flaw, but to understand the terrain." },
        { title: "Classify hosts", body: "Classify each machine by likely role: workstation, application server, DNS, gateway, storage, monitoring. Add a confidence column so assumptions do not become certainties." },
        { title: "Read flows", body: "A useful flow contains source, destination, protocol, port, frequency, and likely reason. If you cannot explain why a flow exists, it deserves a note or verification." },
        { title: "Minimal map", body: "A network map does not need to be pretty. It must be verifiable: zones, machines, services, main flows, unknowns, and next action." }
      ]
    },
    resources: {
      fr: [{ label: "NIST NICE Framework", url: "https://www.nist.gov/itl/applied-cybersecurity/nice" }],
      en: [{ label: "NIST NICE Framework", url: "https://www.nist.gov/itl/applied-cybersecurity/nice" }]
    },
    exercises: {
      fr: [
        { title: "Carte de lab", body: "Dessine trois machines de lab, leurs rôles supposés, les flux attendus et une inconnue à vérifier." },
        { title: "Journal d'hypothèses", body: "Pour chaque port observé, écris le service probable, ton niveau de confiance et la méthode de validation." }
      ],
      en: [
        { title: "Lab map", body: "Draw three lab machines, their likely roles, expected flows, and one unknown to verify." },
        { title: "Hypothesis journal", body: "For each observed port, write likely service, confidence level, and validation method." }
      ]
    },
    quiz: {
      fr: [
        { question: "Quel est le bon premier objectif d'une lecture réseau ?", options: ["Comprendre les rôles et flux", "Tester une cible inconnue", "Publier une liste de ports"], correctOption: 0 },
        { question: "Pourquoi noter le niveau de confiance ?", options: ["Pour séparer preuve et hypothèse", "Pour remplir la page", "Pour ignorer les inconnues"], correctOption: 0 },
        { question: "Que contient un flux utile ?", options: ["Source, destination, protocole, port et raison probable", "Seulement un port", "Seulement une adresse IP"], correctOption: 0 }
      ],
      en: [
        { question: "What is the right first goal when reading a network?", options: ["Understand roles and flows", "Test an unknown target", "Publish a port list"], correctOption: 0 },
        { question: "Why record confidence level?", options: ["To separate evidence from hypothesis", "To fill the page", "To ignore unknowns"], correctOption: 0 },
        { question: "What does a useful flow contain?", options: ["Source, destination, protocol, port, and likely reason", "Only a port", "Only an IP address"], correctOption: 0 }
      ]
    }
  },
  {
    slug: "http-basics",
    categorySlug: "web-security",
    level: "beginner",
    isPremium: false,
    estimatedMinutes: 50,
    title: { fr: "Comprendre HTTP avant la sécurité web", en: "Understand HTTP before web security" },
    summary: { fr: "Lire requêtes, réponses, méthodes, en-têtes, statuts et cookies.", en: "Read requests, responses, methods, headers, statuses, and cookies." },
    objectives: {
      fr: ["Lire une requête HTTP", "Interpréter un code de statut", "Comprendre le rôle des en-têtes"],
      en: ["Read an HTTP request", "Interpret a status code", "Understand header roles"]
    },
    prerequisites: noPrereq,
    sections: {
      fr: [
        { title: "Requête et réponse", body: "HTTP est un dialogue. Le client envoie une méthode, un chemin, des en-têtes et parfois un corps. Le serveur répond avec un statut, des en-têtes et un contenu. La sécurité web commence par savoir lire ce dialogue sans deviner." },
        { title: "Méthodes", body: "GET demande une ressource, POST transmet des données, PUT/PATCH modifient, DELETE supprime. La méthode ne garantit pas l'intention réelle : elle doit être cohérente avec les contrôles côté serveur." },
        { title: "En-têtes et cookies", body: "Les en-têtes décrivent le contexte : type de contenu, cache, origine, session. Un cookie de session sert souvent de preuve temporaire d'authentification. Il doit être protégé et limité." }
      ],
      en: [
        { title: "Request and response", body: "HTTP is a dialogue. The client sends a method, path, headers, and sometimes a body. The server responds with a status, headers, and content. Web security starts by reading this dialogue without guessing." },
        { title: "Methods", body: "GET requests a resource, POST sends data, PUT/PATCH modify, DELETE removes. The method does not guarantee actual intent: it must align with server-side controls." },
        { title: "Headers and cookies", body: "Headers describe context: content type, cache, origin, session. A session cookie often acts as temporary proof of authentication. It must be protected and limited." }
      ]
    },
    resources: {
      fr: [{ label: "MDN - HTTP", url: "https://developer.mozilla.org/fr/docs/Web/HTTP" }],
      en: [{ label: "MDN - HTTP", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP" }]
    },
    exercises: {
      fr: [{ title: "Lecture de transaction", body: "Note méthode, chemin, statut, deux en-têtes importants et ce que chaque élément indique." }],
      en: [{ title: "Transaction reading", body: "Record method, path, status, two important headers, and what each element indicates." }]
    },
    quiz: {
      fr: [
        { question: "Que décrit un code 403 ?", options: ["Accès refusé", "Succès complet", "Redirection permanente"], correctOption: 0 },
        { question: "Pourquoi lire les en-têtes ?", options: ["Ils donnent du contexte de sécurité", "Ils remplacent les journaux", "Ils prouvent tout"], correctOption: 0 }
      ],
      en: [
        { question: "What does a 403 status describe?", options: ["Access denied", "Full success", "Permanent redirect"], correctOption: 0 },
        { question: "Why read headers?", options: ["They give security context", "They replace logs", "They prove everything"], correctOption: 0 }
      ]
    }
  },
  {
    slug: "web-form-basics",
    categorySlug: "web-security",
    level: "beginner",
    isPremium: false,
    estimatedMinutes: 40,
    title: { fr: "Formulaires web et validation", en: "Web forms and validation" },
    summary: { fr: "Comprendre champs, soumission, validation client et validation serveur.", en: "Understand fields, submission, client validation, and server validation." },
    objectives: {
      fr: ["Identifier les données envoyées", "Distinguer validation client et serveur", "Construire une checklist de formulaire"],
      en: ["Identify submitted data", "Separate client and server validation", "Build a form checklist"]
    },
    prerequisites: { fr: [{ label: "Bases HTTP", courseSlug: "http-basics" }], en: [{ label: "HTTP basics", courseSlug: "http-basics" }] },
    sections: {
      fr: [
        { title: "Le formulaire comme contrat", body: "Un formulaire définit ce que l'interface demande, mais pas ce que le serveur doit accepter. L'utilisateur, le navigateur ou un outil de test peuvent envoyer autre chose que ce que l'écran montre." },
        { title: "Validation côté client", body: "La validation dans le navigateur améliore l'expérience, mais elle ne protège pas l'application. Elle peut être contournée ou modifiée. Elle doit donc être répétée côté serveur." },
        { title: "Validation côté serveur", body: "Le serveur vérifie types, longueurs, valeurs autorisées, droits de l'utilisateur et intention de l'action. Une bonne validation donne une erreur claire sans exposer d'information sensible." }
      ],
      en: [
        { title: "The form as a contract", body: "A form defines what the interface asks for, but not what the server should accept. The user, browser, or a test tool can send something different from what the screen shows." },
        { title: "Client-side validation", body: "Browser validation improves experience, but it does not protect the application. It can be bypassed or modified. It must therefore be repeated server-side." },
        { title: "Server-side validation", body: "The server checks types, lengths, allowed values, user rights, and action intent. Good validation returns a clear error without exposing sensitive information." }
      ]
    },
    resources: {
      fr: [{ label: "OWASP Input Validation Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html" }],
      en: [{ label: "OWASP Input Validation Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html" }]
    },
    exercises: {
      fr: [{ title: "Checklist formulaire", body: "Écris une checklist pour un formulaire de connexion : champs, formats, erreurs, limites et droits." }],
      en: [{ title: "Form checklist", body: "Write a checklist for a login form: fields, formats, errors, limits, and rights." }]
    },
    quiz: {
      fr: [
        { question: "Pourquoi la validation client ne suffit-elle pas ?", options: ["Elle peut être contournée", "Elle est toujours lente", "Elle bloque les logs"], correctOption: 0 },
        { question: "Que doit vérifier le serveur ?", options: ["Format, droits et intention", "La couleur du bouton", "Seulement le navigateur"], correctOption: 0 }
      ],
      en: [
        { question: "Why is client validation not enough?", options: ["It can be bypassed", "It is always slow", "It blocks logs"], correctOption: 0 },
        { question: "What should the server verify?", options: ["Format, rights, and intent", "Button color", "Only the browser"], correctOption: 0 }
      ]
    }
  },
  {
    slug: "web-auth-foundations",
    categorySlug: "web-security",
    level: "beginner",
    isPremium: false,
    estimatedMinutes: 65,
    title: { fr: "Fondations de l'authentification web", en: "Web authentication foundations" },
    summary: { fr: "Sessions, cookies, mots de passe, MFA, erreurs courantes et checklist défensive.", en: "Sessions, cookies, passwords, MFA, common mistakes, and defensive checklist." },
    objectives: {
      fr: ["Expliquer une session web", "Identifier les contrôles essentiels", "Évaluer un flux de connexion"],
      en: ["Explain a web session", "Identify essential controls", "Evaluate a sign-in flow"]
    },
    prerequisites: {
      fr: [{ label: "Bases HTTP", courseSlug: "http-basics" }, { label: "Formulaires web", courseSlug: "web-form-basics" }],
      en: [{ label: "HTTP basics", courseSlug: "http-basics" }, { label: "Web forms", courseSlug: "web-form-basics" }]
    },
    sections: {
      fr: [
        { title: "Authentification, session, autorisation", body: "L'authentification répond à 'qui es-tu ?'. La session garde cet état pendant une durée limitée. L'autorisation répond à 'as-tu le droit de faire cette action ?'. Les confondre crée des failles de logique." },
        { title: "Mot de passe et MFA", body: "Un bon flux limite les essais, protège les secrets, propose MFA quand le risque le justifie et évite les messages qui révèlent trop d'information. Le but n'est pas de rendre la connexion pénible, mais robuste." },
        { title: "Session cookie", body: "Un cookie de session doit être limité, protégé contre l'accès inutile, renouvelé avec prudence et invalidé à la déconnexion. La durée de vie doit correspondre au risque de l'application." },
        { title: "Checklist", body: "Vérifie : validation serveur, limitation des essais, gestion des erreurs, renouvellement de session, séparation des droits, récupération de compte, journaux utiles et procédure de révocation." }
      ],
      en: [
        { title: "Authentication, session, authorization", body: "Authentication answers 'who are you?'. The session keeps that state for a limited time. Authorization answers 'are you allowed to do this action?'. Confusing them creates logic flaws." },
        { title: "Password and MFA", body: "A good flow limits attempts, protects secrets, offers MFA when risk justifies it, and avoids messages that reveal too much. The goal is not painful sign-in, but robustness." },
        { title: "Session cookie", body: "A session cookie should be limited, protected from unnecessary access, renewed carefully, and invalidated on sign-out. Lifetime should match application risk." },
        { title: "Checklist", body: "Check: server validation, attempt limiting, error handling, session renewal, rights separation, account recovery, useful logs, and revocation process." }
      ]
    },
    resources: {
      fr: [{ label: "OWASP Authentication Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html" }],
      en: [{ label: "OWASP Authentication Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html" }]
    },
    exercises: {
      fr: [{ title: "Audit de flux", body: "Décris un flux de connexion idéal en 8 étapes : saisie, validation, tentative, session, MFA, erreur, déconnexion, récupération." }],
      en: [{ title: "Flow audit", body: "Describe an ideal sign-in flow in 8 steps: input, validation, attempt, session, MFA, error, sign-out, recovery." }]
    },
    quiz: {
      fr: [
        { question: "Que vérifie l'autorisation ?", options: ["Le droit d'effectuer une action", "Le format d'un email", "La couleur du formulaire"], correctOption: 0 },
        { question: "Pourquoi limiter les essais ?", options: ["Pour réduire les tentatives répétées", "Pour supprimer MFA", "Pour éviter les cookies"], correctOption: 0 },
        { question: "Que doit faire la déconnexion ?", options: ["Invalider la session", "Changer le thème", "Publier les journaux"], correctOption: 0 }
      ],
      en: [
        { question: "What does authorization verify?", options: ["The right to perform an action", "Email format", "Form color"], correctOption: 0 },
        { question: "Why limit attempts?", options: ["To reduce repeated attempts", "To remove MFA", "To avoid cookies"], correctOption: 0 },
        { question: "What should sign-out do?", options: ["Invalidate the session", "Change the theme", "Publish logs"], correctOption: 0 }
      ]
    }
  },
  {
    slug: "linux-shell-basics",
    categorySlug: "linux",
    level: "beginner",
    isPremium: false,
    estimatedMinutes: 55,
    title: { fr: "Shell Linux pour l'analyse", en: "Linux shell for analysis" },
    summary: { fr: "Se déplacer, lire, filtrer, comprendre permissions et journaux sans casser le système.", en: "Navigate, read, filter, understand permissions and logs without breaking the system." },
    objectives: {
      fr: ["Utiliser les commandes de lecture", "Comprendre permissions et propriétaires", "Filtrer un journal simple"],
      en: ["Use reading commands", "Understand permissions and owners", "Filter a simple log"]
    },
    prerequisites: noPrereq,
    sections: {
      fr: [
        { title: "Lire avant modifier", body: "En sécurité, la première compétence Linux est l'observation. pwd, ls, cat, less, head, tail, file et stat permettent de comprendre où tu es, ce que tu regardes et quelles métadonnées entourent un fichier." },
        { title: "Permissions", body: "Les permissions se lisent par utilisateur, groupe et autres. Le propriétaire n'est pas forcément le seul à pouvoir agir. Pour analyser un problème, note toujours propriétaire, groupe, droits et chemin complet." },
        { title: "Filtrage", body: "grep, sort, uniq, cut et wc transforment un gros journal en information lisible. La bonne question n'est pas 'quelle commande lancer ?', mais 'quelle observation je veux extraire ?'." }
      ],
      en: [
        { title: "Read before modifying", body: "In security, the first Linux skill is observation. pwd, ls, cat, less, head, tail, file, and stat help understand where you are, what you read, and which metadata surrounds a file." },
        { title: "Permissions", body: "Permissions are read by user, group, and others. The owner is not always the only actor. To analyze an issue, always record owner, group, rights, and full path." },
        { title: "Filtering", body: "grep, sort, uniq, cut, and wc turn a large log into readable information. The right question is not 'which command?', but 'which observation do I need?'." }
      ]
    },
    resources: {
      fr: [{ label: "Linux man-pages", url: "https://www.kernel.org/doc/man-pages/" }],
      en: [{ label: "Linux man-pages", url: "https://www.kernel.org/doc/man-pages/" }]
    },
    exercises: {
      fr: [{ title: "Lecture de journal", body: "Prends un journal de lab, extrais les 5 lignes les plus récentes, puis filtre un mot clé et compte les occurrences." }],
      en: [{ title: "Log reading", body: "Take a lab log, extract the 5 most recent lines, then filter a keyword and count occurrences." }]
    },
    quiz: {
      fr: [
        { question: "Quelle posture adopter avant de modifier un fichier système ?", options: ["Observer et documenter", "Changer les droits", "Supprimer le fichier"], correctOption: 0 },
        { question: "Que montre stat ?", options: ["Des métadonnées de fichier", "Une page web", "Un mot de passe"], correctOption: 0 }
      ],
      en: [
        { question: "What posture should you adopt before modifying a system file?", options: ["Observe and document", "Change rights", "Delete the file"], correctOption: 0 },
        { question: "What does stat show?", options: ["File metadata", "A web page", "A password"], correctOption: 0 }
      ]
    }
  },
  {
    slug: "linux-service-hardening",
    categorySlug: "linux",
    level: "intermediate",
    isPremium: true,
    estimatedMinutes: 75,
    title: { fr: "Durcir un service Linux local", en: "Harden a local Linux service" },
    summary: { fr: "Réduire les droits d'un service, limiter son exposition et préparer un retour arrière.", en: "Reduce service privileges, limit exposure, and prepare rollback." },
    objectives: {
      fr: ["Appliquer le moindre privilège", "Limiter fichiers et réseau", "Préparer une procédure de retour arrière"],
      en: ["Apply least privilege", "Limit files and network", "Prepare a rollback procedure"]
    },
    prerequisites: {
      fr: [{ label: "Shell Linux pour l'analyse", courseSlug: "linux-shell-basics" }, { label: "Laboratoire local autorisé", courseSlug: "local-lab-vm-setup" }],
      en: [{ label: "Linux shell for analysis", courseSlug: "linux-shell-basics" }, { label: "Authorized local lab", courseSlug: "local-lab-vm-setup" }]
    },
    sections: {
      fr: [
        { title: "Surface de service", body: "Un service expose un port, lit des fichiers, écrit des données et tourne sous une identité. Le durcissement consiste à réduire chaque capacité au besoin strict." },
        { title: "Utilisateur dédié", body: "Un service ne devrait pas utiliser un compte humain ni un compte administrateur. Un utilisateur dédié limite les dégâts si le service se comporte mal ou reçoit une entrée inattendue." },
        { title: "Journaux et rollback", body: "Avant de durcir, note l'état initial et garde une méthode de retour arrière. Après changement, vérifie démarrage, journaux, accès attendu et absence de droits inutiles." }
      ],
      en: [
        { title: "Service surface", body: "A service exposes a port, reads files, writes data, and runs under an identity. Hardening reduces each capability to strict need." },
        { title: "Dedicated user", body: "A service should not use a human account or administrator account. A dedicated user limits damage if the service misbehaves or receives unexpected input." },
        { title: "Logs and rollback", body: "Before hardening, record initial state and keep a rollback method. After changes, verify startup, logs, expected access, and absence of unnecessary rights." }
      ]
    },
    resources: {
      fr: [{ label: "systemd.exec", url: "https://www.freedesktop.org/software/systemd/man/latest/systemd.exec.html" }],
      en: [{ label: "systemd.exec", url: "https://www.freedesktop.org/software/systemd/man/latest/systemd.exec.html" }]
    },
    exercises: {
      fr: [{ title: "Profil de service", body: "Décris identité, fichiers nécessaires, ports attendus, journaux et méthode de retour arrière pour un service de lab.", premium: true }],
      en: [{ title: "Service profile", body: "Describe identity, required files, expected ports, logs, and rollback method for a lab service.", premium: true }]
    },
    quiz: {
      fr: [
        { question: "Quel principe réduit l'impact d'un service compromis ?", options: ["Moindre privilège", "Mot de passe partagé", "Journaux désactivés"], correctOption: 0 },
        { question: "Pourquoi préparer un rollback ?", options: ["Pour restaurer un état fonctionnel", "Pour cacher les changements", "Pour éviter les tests"], correctOption: 0 }
      ],
      en: [
        { question: "Which principle reduces the impact of a compromised service?", options: ["Least privilege", "Shared password", "Disabled logs"], correctOption: 0 },
        { question: "Why prepare rollback?", options: ["To restore a working state", "To hide changes", "To avoid tests"], correctOption: 0 }
      ]
    }
  },
  {
    slug: "ctf-evidence-notes",
    categorySlug: "ctf-labs",
    level: "beginner",
    isPremium: false,
    estimatedMinutes: 45,
    title: { fr: "Prendre des notes de lab exploitables", en: "Take useful lab notes" },
    summary: { fr: "Transformer un défi isolé en preuve de méthode, pas seulement en résultat.", en: "Turn an isolated challenge into evidence of method, not only a result." },
    objectives: {
      fr: ["Structurer hypothèses et preuves", "Séparer action, observation et conclusion", "Préparer une restitution courte"],
      en: ["Structure hypotheses and evidence", "Separate action, observation, and conclusion", "Prepare a short write-up"]
    },
    prerequisites: { fr: [{ label: "Laboratoire local autorisé", courseSlug: "local-lab-vm-setup" }], en: [{ label: "Authorized local lab", courseSlug: "local-lab-vm-setup" }] },
    sections: {
      fr: [
        { title: "La note comme outil", body: "Une note de lab utile ne raconte pas seulement la fin. Elle explique le contexte, l'hypothèse, l'action, l'observation et la conclusion. Elle permet de recommencer sans improviser." },
        { title: "Preuve et limite", body: "Une capture ou une sortie de commande doit être accompagnée de son contexte : machine, heure, état du lab et interprétation. Sans contexte, une preuve devient fragile." },
        { title: "Restitution", body: "Termine par trois lignes : ce qui a été appris, ce qui reste incertain, et la prochaine action. C'est cette boucle qui construit la progression." }
      ],
      en: [
        { title: "The note as a tool", body: "A useful lab note does not only tell the ending. It explains context, hypothesis, action, observation, and conclusion. It lets you repeat without improvising." },
        { title: "Evidence and limit", body: "A screenshot or command output needs context: machine, time, lab state, and interpretation. Without context, evidence is fragile." },
        { title: "Write-up", body: "End with three lines: what was learned, what remains uncertain, and the next action. This loop builds progress." }
      ]
    },
    resources: {
      fr: [{ label: "NIST NICE Framework", url: "https://www.nist.gov/itl/applied-cybersecurity/nice" }],
      en: [{ label: "NIST NICE Framework", url: "https://www.nist.gov/itl/applied-cybersecurity/nice" }]
    },
    exercises: {
      fr: [{ title: "Journal de lab", body: "Rédige une note avec contexte, hypothèse, action, observation, conclusion et prochaine étape." }],
      en: [{ title: "Lab journal", body: "Write a note with context, hypothesis, action, observation, conclusion, and next step." }]
    },
    quiz: {
      fr: [
        { question: "Pourquoi séparer action et conclusion ?", options: ["Pour éviter de confondre observation et interprétation", "Pour écrire plus long", "Pour masquer le résultat"], correctOption: 0 },
        { question: "Que doit contenir une preuve de lab ?", options: ["Contexte et interprétation", "Seulement une capture", "Un titre vague"], correctOption: 0 }
      ],
      en: [
        { question: "Why separate action and conclusion?", options: ["To avoid confusing observation and interpretation", "To write longer", "To hide the result"], correctOption: 0 },
        { question: "What should lab evidence include?", options: ["Context and interpretation", "Only a screenshot", "A vague title"], correctOption: 0 }
      ]
    }
  },
  {
    slug: "infrastructure-asset-baseline",
    categorySlug: "hardware-infrastructure",
    level: "beginner",
    isPremium: false,
    estimatedMinutes: 55,
    title: { fr: "Inventaire d'infrastructure utile", en: "Useful infrastructure inventory" },
    summary: { fr: "Identifier machines, rôles, dépendances, sauvegardes et exposition.", en: "Identify machines, roles, dependencies, backups, and exposure." },
    objectives: {
      fr: ["Classer les actifs", "Décrire dépendances et exposition", "Repérer les priorités de durcissement"],
      en: ["Classify assets", "Describe dependencies and exposure", "Identify hardening priorities"]
    },
    prerequisites: { fr: [{ label: "Bases TCP/IP", courseSlug: "tcpip-basics" }], en: [{ label: "TCP/IP basics", courseSlug: "tcpip-basics" }] },
    sections: {
      fr: [
        { title: "Actif et rôle", body: "Un actif n'est pas seulement une machine. C'est un élément qui porte une fonction : authentifier, stocker, router, sauvegarder, publier ou superviser." },
        { title: "Dépendances", body: "Un service dépend souvent d'un DNS, d'un compte, d'un disque, d'une sauvegarde ou d'un autre service. Une panne de dépendance devient une panne du service." },
        { title: "Priorité", body: "Commence par ce qui est exposé, critique ou mal compris. Un inventaire sert à décider quoi protéger d'abord." }
      ],
      en: [
        { title: "Asset and role", body: "An asset is not just a machine. It carries a function: authenticate, store, route, backup, publish, or monitor." },
        { title: "Dependencies", body: "A service often depends on DNS, an account, a disk, a backup, or another service. Dependency failure becomes service failure." },
        { title: "Priority", body: "Start with what is exposed, critical, or poorly understood. Inventory helps decide what to protect first." }
      ]
    },
    resources: {
      fr: [{ label: "CIS Controls - Inventory", url: "https://www.cisecurity.org/controls/inventory-and-control-of-enterprise-assets" }],
      en: [{ label: "CIS Controls - Inventory", url: "https://www.cisecurity.org/controls/inventory-and-control-of-enterprise-assets" }]
    },
    exercises: {
      fr: [{ title: "Fiche actif", body: "Rédige une fiche pour une machine : rôle, dépendances, exposition, sauvegarde, priorité." }],
      en: [{ title: "Asset sheet", body: "Write a sheet for one machine: role, dependencies, exposure, backup, priority." }]
    },
    quiz: {
      fr: [{ question: "À quoi sert un inventaire ?", options: ["Prioriser la protection", "Décorer un diagramme", "Remplacer les sauvegardes"], correctOption: 0 }],
      en: [{ question: "What is inventory for?", options: ["Prioritizing protection", "Decorating a diagram", "Replacing backups"], correctOption: 0 }]
    }
  },
  {
    slug: "opsec-public-footprint-review",
    categorySlug: "opsec",
    level: "beginner",
    isPremium: false,
    estimatedMinutes: 60,
    title: { fr: "Revue d'empreinte publique", en: "Public footprint review" },
    summary: { fr: "Identifier ce qu'un profil, un domaine ou une organisation expose volontairement ou par habitude.", en: "Identify what a profile, domain, or organization exposes voluntarily or by habit." },
    objectives: {
      fr: ["Distinguer information publique et information sensible", "Construire une fiche d'exposition", "Choisir des mesures de réduction réalistes"],
      en: ["Distinguish public and sensitive information", "Build an exposure sheet", "Choose realistic reduction measures"]
    },
    prerequisites: noPrereq,
    sections: {
      fr: [
        { title: "Ce qu'est l'empreinte", body: "L'empreinte publique regroupe les informations accessibles sans intrusion : profils, biographies, documents publiés, noms d'outils, adresses, habitudes, technologies annoncées et liens entre personnes. Le travail OpSec consiste à comprendre ce que ces informations permettent de déduire." },
        { title: "Classer le risque", body: "Une information n'est pas dangereuse toute seule par nature. Elle devient sensible si elle aide à usurper une identité, deviner un processus, cibler une personne ou contourner une protection. Classe chaque élément en contexte, exposition, utilité pour un tiers et mesure de réduction." },
        { title: "Réduire sans disparaître", body: "La bonne OpSec ne consiste pas à tout supprimer. Elle consiste à publier moins de détails inutiles, séparer les identités, limiter les métadonnées, éviter les routines trop visibles et vérifier régulièrement ce qui reste public." }
      ],
      en: [
        { title: "What footprint means", body: "Public footprint includes information reachable without intrusion: profiles, biographies, published documents, tool names, addresses, habits, announced technologies, and links between people. OpSec work is understanding what can be inferred from it." },
        { title: "Classify risk", body: "Information is not automatically dangerous by itself. It becomes sensitive if it helps impersonation, process guessing, personal targeting, or bypassing a protection. Class each item by context, exposure, usefulness to a third party, and reduction measure." },
        { title: "Reduce without disappearing", body: "Good OpSec is not deleting everything. It is publishing fewer unnecessary details, separating identities, limiting metadata, avoiding visible routines, and checking regularly what remains public." }
      ]
    },
    resources: {
      fr: [{ label: "CNIL - Maîtriser son identité numérique", url: "https://www.cnil.fr/fr/maitriser-mes-donnees" }],
      en: [{ label: "EFF - Surveillance Self-Defense", url: "https://ssd.eff.org/" }]
    },
    exercises: {
      fr: [{ title: "Fiche d'exposition personnelle", body: "Choisis un profil public de test ou ton propre profil. Note 10 informations visibles, leur utilité potentielle, puis une action de réduction pour chaque information risquée." }],
      en: [{ title: "Personal exposure sheet", body: "Choose a test public profile or your own profile. Record 10 visible pieces of information, their potential usefulness, then one reduction action for each risky item." }]
    },
    quiz: {
      fr: [
        { question: "Quelle est la bonne première étape d'une revue OpSec ?", options: ["Inventorier ce qui est public", "Supprimer tous les comptes", "Tester des identifiants"], correctOption: 0 },
        { question: "Quand une information devient-elle sensible ?", options: ["Quand elle aide une déduction ou un ciblage", "Quand elle est courte", "Quand elle contient un logo"], correctOption: 0 },
        { question: "Quel objectif est réaliste ?", options: ["Réduire les détails inutiles", "Devenir invisible partout", "Partager les routines pour rassurer"], correctOption: 0 }
      ],
      en: [
        { question: "What is the right first step in an OpSec review?", options: ["Inventory what is public", "Delete every account", "Test credentials"], correctOption: 0 },
        { question: "When does information become sensitive?", options: ["When it helps inference or targeting", "When it is short", "When it contains a logo"], correctOption: 0 },
        { question: "Which objective is realistic?", options: ["Reduce unnecessary details", "Become invisible everywhere", "Share routines for reassurance"], correctOption: 0 }
      ]
    }
  },
  {
    slug: "crypto-hashing-and-passwords",
    categorySlug: "cryptography",
    level: "beginner",
    isPremium: false,
    estimatedMinutes: 65,
    title: { fr: "Hash, sel et mots de passe", en: "Hashing, salt, and passwords" },
    summary: { fr: "Comprendre ce qu'un hash protège, ce qu'il ne protège pas et pourquoi les mots de passe demandent un traitement spécial.", en: "Understand what a hash protects, what it does not protect, and why passwords need special handling." },
    objectives: {
      fr: ["Différencier hash, chiffrement et signature", "Expliquer le rôle d'un sel", "Identifier les erreurs fréquentes de stockage de mots de passe"],
      en: ["Differentiate hashing, encryption, and signatures", "Explain the role of salt", "Identify common password storage mistakes"]
    },
    prerequisites: noPrereq,
    sections: {
      fr: [
        { title: "Hash n'est pas chiffrement", body: "Un hash transforme une donnée en empreinte courte et vérifiable. Il ne se déchiffre pas. Deux données identiques donnent la même empreinte avec le même algorithme, ce qui permet de vérifier l'intégrité, mais aussi de comparer des valeurs." },
        { title: "Le sel casse les comparaisons simples", body: "Un sel est une valeur unique ajoutée avant le calcul. Il empêche deux utilisateurs avec le même mot de passe d'avoir la même empreinte et rend les tables pré-calculées beaucoup moins utiles." },
        { title: "Mots de passe", body: "Les mots de passe humains sont souvent faibles. Ils doivent être traités avec des fonctions dédiées, lentes et paramétrables. La règle pratique : ne jamais stocker un mot de passe en clair, ne pas utiliser un hash rapide seul, et documenter les paramètres." }
      ],
      en: [
        { title: "Hashing is not encryption", body: "A hash turns data into a short verifiable fingerprint. It is not decrypted. Identical data gives the same fingerprint with the same algorithm, which helps verify integrity but also compare values." },
        { title: "Salt breaks simple comparisons", body: "A salt is a unique value added before calculation. It prevents two users with the same password from having the same fingerprint and makes precomputed tables far less useful." },
        { title: "Passwords", body: "Human passwords are often weak. They need dedicated, slow, configurable functions. Practical rule: never store a password in clear text, do not use a fast hash alone, and document the parameters." }
      ]
    },
    resources: {
      fr: [{ label: "OWASP Password Storage Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html" }],
      en: [{ label: "OWASP Password Storage Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html" }]
    },
    exercises: {
      fr: [{ title: "Tri de concepts", body: "Classe ces usages : vérifier un fichier, cacher un message, prouver l'auteur, protéger un mot de passe. Associe chaque usage à hash, chiffrement, signature ou fonction de mot de passe." }],
      en: [{ title: "Concept sorting", body: "Classify these uses: verify a file, hide a message, prove authorship, protect a password. Associate each use with hashing, encryption, signature, or password function." }]
    },
    quiz: {
      fr: [
        { question: "Un hash peut-il être déchiffré ?", options: ["Non, ce n'est pas du chiffrement", "Oui, avec la bonne clé", "Oui, si le sel est public"], correctOption: 0 },
        { question: "À quoi sert le sel ?", options: ["Rendre les empreintes uniques par contexte", "Accélérer les essais", "Remplacer le mot de passe"], correctOption: 0 },
        { question: "Pourquoi une fonction lente est utile pour les mots de passe ?", options: ["Elle rend les essais massifs plus coûteux", "Elle rend le mot de passe plus court", "Elle évite les sauvegardes"], correctOption: 0 }
      ],
      en: [
        { question: "Can a hash be decrypted?", options: ["No, it is not encryption", "Yes, with the right key", "Yes, if the salt is public"], correctOption: 0 },
        { question: "What is salt for?", options: ["Making fingerprints unique by context", "Speeding up attempts", "Replacing the password"], correctOption: 0 },
        { question: "Why is a slow function useful for passwords?", options: ["It makes mass attempts more costly", "It makes the password shorter", "It avoids backups"], correctOption: 0 }
      ]
    }
  },
  {
    slug: "forensics-timeline-first-pass",
    categorySlug: "forensics",
    level: "beginner",
    isPremium: false,
    estimatedMinutes: 70,
    title: { fr: "Première chronologie forensic", en: "First forensic timeline" },
    summary: { fr: "Construire une chronologie sobre à partir d'horodatages, journaux et artefacts sans surinterpréter.", en: "Build a sober timeline from timestamps, logs, and artifacts without overinterpreting." },
    objectives: {
      fr: ["Préserver le contexte d'une preuve", "Aligner plusieurs horodatages", "Séparer fait observé et hypothèse"],
      en: ["Preserve evidence context", "Align several timestamps", "Separate observed fact and hypothesis"]
    },
    prerequisites: { fr: [{ label: "Shell Linux pour l'analyse", courseSlug: "linux-shell-basics" }, { label: "Notes de lab exploitables", courseSlug: "ctf-evidence-notes" }], en: [{ label: "Linux shell for analysis", courseSlug: "linux-shell-basics" }, { label: "Useful lab notes", courseSlug: "ctf-evidence-notes" }] },
    sections: {
      fr: [
        { title: "Une chronologie n'est pas une histoire", body: "La chronologie liste d'abord des faits : heure, source, événement, confiance, commentaire. L'histoire vient après, quand plusieurs faits soutiennent une hypothèse." },
        { title: "Horodatages et fuseaux", body: "Deux journaux peuvent utiliser des fuseaux ou formats différents. Note toujours la source du temps, le fuseau supposé et les incertitudes. Un mauvais alignement peut créer une fausse séquence." },
        { title: "Confiance", body: "Chaque ligne mérite un niveau de confiance : observé directement, déduit, probable ou incertain. Cette discipline évite de transformer un indice faible en conclusion forte." }
      ],
      en: [
        { title: "A timeline is not a story", body: "A timeline first lists facts: time, source, event, confidence, comment. The story comes later, when several facts support a hypothesis." },
        { title: "Timestamps and time zones", body: "Two logs may use different time zones or formats. Always record time source, assumed time zone, and uncertainty. Bad alignment can create a false sequence." },
        { title: "Confidence", body: "Every line deserves a confidence level: directly observed, inferred, probable, or uncertain. This discipline avoids turning a weak clue into a strong conclusion." }
      ]
    },
    resources: {
      fr: [{ label: "NIST SP 800-86", url: "https://csrc.nist.gov/publications/detail/sp/800-86/final" }],
      en: [{ label: "NIST SP 800-86", url: "https://csrc.nist.gov/publications/detail/sp/800-86/final" }]
    },
    exercises: {
      fr: [{ title: "Table chronologique", body: "À partir de 8 événements de lab, crée une table avec heure, source, fait observé, hypothèse possible et niveau de confiance." }],
      en: [{ title: "Timeline table", body: "From 8 lab events, create a table with time, source, observed fact, possible hypothesis, and confidence level." }]
    },
    quiz: {
      fr: [
        { question: "Pourquoi indiquer le fuseau horaire ?", options: ["Pour éviter une fausse séquence", "Pour rendre la table plus longue", "Pour masquer la source"], correctOption: 0 },
        { question: "Que faut-il séparer ?", options: ["Fait observé et hypothèse", "Heure et source", "Titre et contenu"], correctOption: 0 },
        { question: "Une ligne incertaine doit être...", options: ["Marquée comme incertaine", "Supprimée automatiquement", "Transformée en conclusion"], correctOption: 0 }
      ],
      en: [
        { question: "Why record the time zone?", options: ["To avoid a false sequence", "To make the table longer", "To hide the source"], correctOption: 0 },
        { question: "What should be separated?", options: ["Observed fact and hypothesis", "Time and source", "Title and content"], correctOption: 0 },
        { question: "An uncertain line should be...", options: ["Marked as uncertain", "Automatically deleted", "Turned into a conclusion"], correctOption: 0 }
      ]
    }
  },
  {
    slug: "blue-team-alert-triage",
    categorySlug: "blue-team",
    level: "intermediate",
    isPremium: false,
    estimatedMinutes: 80,
    title: { fr: "Triage d'alerte Blue Team", en: "Blue Team alert triage" },
    summary: { fr: "Qualifier une alerte, vérifier son contexte et décider d'une action proportionnée.", en: "Qualify an alert, verify its context, and choose a proportionate action." },
    objectives: {
      fr: ["Décrire le signal d'une alerte", "Chercher le contexte utile", "Décider entre faux positif, surveillance et escalade"],
      en: ["Describe an alert signal", "Look for useful context", "Decide between false positive, monitoring, and escalation"]
    },
    prerequisites: { fr: [{ label: "Inventaire d'infrastructure utile", courseSlug: "infrastructure-asset-baseline" }, { label: "Première chronologie forensic", courseSlug: "forensics-timeline-first-pass" }], en: [{ label: "Useful infrastructure inventory", courseSlug: "infrastructure-asset-baseline" }, { label: "First forensic timeline", courseSlug: "forensics-timeline-first-pass" }] },
    sections: {
      fr: [
        { title: "Le signal", body: "Une alerte est un signal, pas une vérité. Commence par nommer ce qui l'a déclenchée : source, règle, actif concerné, heure, sévérité annoncée et comportement observé." },
        { title: "Le contexte change tout", body: "La même alerte n'a pas la même gravité sur un poste de test, un serveur exposé ou un compte administrateur. Le triage cherche le contexte minimal : rôle de l'actif, utilisateur, historique récent et impact possible." },
        { title: "Décision proportionnée", body: "Une bonne décision est justifiable : faux positif documenté, surveillance avec critère de sortie, ou escalade avec preuves. L'objectif est de réduire l'incertitude sans bloquer inutilement l'activité." }
      ],
      en: [
        { title: "The signal", body: "An alert is a signal, not truth. Start by naming what triggered it: source, rule, affected asset, time, announced severity, and observed behavior." },
        { title: "Context changes everything", body: "The same alert does not carry the same severity on a test workstation, an exposed server, or an admin account. Triage looks for minimal context: asset role, user, recent history, and possible impact." },
        { title: "Proportionate decision", body: "A good decision is justifiable: documented false positive, monitoring with exit criteria, or escalation with evidence. The goal is reducing uncertainty without unnecessarily blocking activity." }
      ]
    },
    resources: {
      fr: [{ label: "CISA Incident Response Playbook", url: "https://www.cisa.gov/resources-tools/resources/federal-government-cybersecurity-incident-and-vulnerability-response-playbooks" }],
      en: [{ label: "CISA Incident Response Playbook", url: "https://www.cisa.gov/resources-tools/resources/federal-government-cybersecurity-incident-and-vulnerability-response-playbooks" }]
    },
    exercises: {
      fr: [{ title: "Fiche de triage", body: "Rédige une fiche avec signal, contexte, hypothèses, preuves manquantes, décision et prochaine vérification." }],
      en: [{ title: "Triage sheet", body: "Write a sheet with signal, context, hypotheses, missing evidence, decision, and next verification." }]
    },
    quiz: {
      fr: [
        { question: "Une alerte doit d'abord être considérée comme...", options: ["Un signal à qualifier", "Une compromission certaine", "Un élément à ignorer"], correctOption: 0 },
        { question: "Quel contexte est utile ?", options: ["Rôle de l'actif et historique récent", "Couleur du tableau", "Nom du navigateur uniquement"], correctOption: 0 },
        { question: "Qu'est-ce qu'une bonne escalade ?", options: ["Une décision accompagnée de preuves", "Un message vague", "Une fermeture sans note"], correctOption: 0 }
      ],
      en: [
        { question: "An alert should first be considered...", options: ["A signal to qualify", "A certain compromise", "Something to ignore"], correctOption: 0 },
        { question: "Which context is useful?", options: ["Asset role and recent history", "Dashboard color", "Browser name only"], correctOption: 0 },
        { question: "What makes a good escalation?", options: ["A decision with evidence", "A vague message", "Closing without notes"], correctOption: 0 }
      ]
    }
  },
  {
    slug: "ethical-red-team-scope-and-reporting",
    categorySlug: "ethical-red-team",
    level: "intermediate",
    isPremium: true,
    estimatedMinutes: 85,
    title: { fr: "Cadrage et rapport d'un test autorisé", en: "Scoping and reporting an authorized test" },
    summary: { fr: "Définir un périmètre, travailler en laboratoire ou mission autorisée, et produire un rapport utile.", en: "Define scope, work in a lab or authorized mission, and produce a useful report." },
    objectives: {
      fr: ["Rédiger un périmètre clair", "Identifier les limites éthiques et opérationnelles", "Transformer une observation en recommandation"],
      en: ["Write clear scope", "Identify ethical and operational limits", "Turn an observation into a recommendation"]
    },
    prerequisites: { fr: [{ label: "Laboratoire local autorisé", courseSlug: "local-lab-vm-setup" }, { label: "Notes de lab exploitables", courseSlug: "ctf-evidence-notes" }], en: [{ label: "Authorized local lab", courseSlug: "local-lab-vm-setup" }, { label: "Useful lab notes", courseSlug: "ctf-evidence-notes" }] },
    sections: {
      fr: [
        { title: "Autorisation explicite", body: "Un test offensif n'est acceptable que dans un cadre autorisé : lab personnel, CTF, environnement fourni ou mission validée. Le périmètre doit préciser cibles, dates, contacts, limites et actions interdites." },
        { title: "Preuve utile", body: "Une preuve doit montrer le risque sans causer de dommage. Elle contient contexte, impact, étapes de validation dans l'environnement autorisé, limites et niveau de confiance." },
        { title: "Rapport", body: "Un bon rapport aide à corriger. Pour chaque constat : description, impact, preuve, recommandation, priorité et vérification attendue. Le ton reste factuel, jamais spectaculaire." }
      ],
      en: [
        { title: "Explicit authorization", body: "An offensive test is acceptable only in an authorized frame: personal lab, CTF, provided environment, or validated mission. Scope must define targets, dates, contacts, limits, and forbidden actions." },
        { title: "Useful evidence", body: "Evidence should show risk without causing damage. It includes context, impact, validation steps inside the authorized environment, limits, and confidence level." },
        { title: "Report", body: "A good report helps remediation. For each finding: description, impact, evidence, recommendation, priority, and expected verification. Tone stays factual, never theatrical." }
      ]
    },
    resources: {
      fr: [{ label: "OWASP Testing Guide", url: "https://owasp.org/www-project-web-security-testing-guide/" }],
      en: [{ label: "OWASP Testing Guide", url: "https://owasp.org/www-project-web-security-testing-guide/" }]
    },
    exercises: {
      fr: [{ title: "Fiche de cadrage", body: "Écris le périmètre d'un lab autorisé : objectifs, cibles, interdits, preuves acceptables, contact et critère de fin.", premium: true }],
      en: [{ title: "Scope sheet", body: "Write the scope for an authorized lab: objectives, targets, forbidden actions, acceptable evidence, contact, and ending criterion.", premium: true }]
    },
    quiz: {
      fr: [
        { question: "Quel élément est indispensable avant un test offensif ?", options: ["Une autorisation explicite", "Une cible publique", "Un pseudonyme"], correctOption: 0 },
        { question: "Une preuve doit...", options: ["Montrer le risque sans dommage", "Maximiser l'impact", "Supprimer les traces"], correctOption: 0 },
        { question: "Un rapport utile contient surtout...", options: ["Constat, impact et recommandation", "Des slogans", "Des captures sans contexte"], correctOption: 0 }
      ],
      en: [
        { question: "What is required before an offensive test?", options: ["Explicit authorization", "A public target", "A nickname"], correctOption: 0 },
        { question: "Evidence should...", options: ["Show risk without damage", "Maximize impact", "Remove traces"], correctOption: 0 },
        { question: "A useful report mainly contains...", options: ["Finding, impact, and recommendation", "Slogans", "Screenshots without context"], correctOption: 0 }
      ]
    }
  }
];

type CourseEnhancement = {
  sections: Record<Locale, { title: string; body: string }[]>;
  exercises: Record<Locale, { title: string; body: string; premium?: boolean }[]>;
  quiz: Record<Locale, QuizQuestion[]>;
};

const courseEnhancements = {
  "tcpip-basics": {
    sections: {
      fr: [
        {
          title: "Définitions utiles",
          body: "Une adresse IP identifie une interface sur un réseau. Un masque découpe cette adresse entre partie réseau et partie hôte. Un port identifie une application ou un service attendu sur une machine. Un protocole définit les règles de l'échange : TCP privilégie la fiabilité, UDP la simplicité, ICMP le diagnostic."
        },
        {
          title: "Mise en situation",
          body: "Tu arrives sur un petit réseau de lab. Un poste 192.168.10.25 n'atteint plus l'intranet 192.168.20.10. Avant de conclure à une panne, tu vérifies le masque, la passerelle, le port demandé et le protocole. Cette lecture évite de confondre problème d'adressage, filtrage réseau et service indisponible."
        }
      ],
      en: [
        {
          title: "Useful definitions",
          body: "An IP address identifies an interface on a network. A mask splits that address between network and host parts. A port identifies an expected application or service on a machine. A protocol defines exchange rules: TCP favors reliability, UDP favors simplicity, and ICMP supports diagnostics."
        },
        {
          title: "Scenario",
          body: "You enter a small lab network. A workstation at 192.168.10.25 can no longer reach the intranet at 192.168.20.10. Before calling it an outage, you check the mask, gateway, requested port, and protocol. That reading avoids confusing addressing, filtering, and unavailable service."
        }
      ]
    },
    exercises: {
      fr: [
        { title: "Diagnostic d'un poste isolé", body: "On te donne 192.168.10.25/24, passerelle 192.168.10.1, service attendu 192.168.20.10:443. Écris les 5 vérifications à faire dans l'ordre, puis précise ce que chaque résultat te permet de conclure ou non." },
        { title: "Mini glossaire réseau", body: "Définis IP, masque, passerelle, port, protocole et service avec une phrase simple et un exemple de lab pour chacun." }
      ],
      en: [
        { title: "Isolated workstation diagnostic", body: "Given 192.168.10.25/24, gateway 192.168.10.1, expected service 192.168.20.10:443. Write the 5 checks to perform in order, then state what each result lets you conclude or not." },
        { title: "Network mini glossary", body: "Define IP, mask, gateway, port, protocol, and service with one plain sentence and one lab example for each." }
      ]
    },
    quiz: {
      fr: [
        { question: "Un poste en /24 essaie de joindre une adresse dans un autre /24. Quelle vérification vient en premier ?", options: ["La passerelle configurée et joignable", "La couleur du câble", "Le nom commercial du service"], correctOption: 0 },
        { question: "Tu vois du trafic vers 10.0.0.8:53 en UDP. Quelle phrase est la plus prudente ?", options: ["Le poste interroge probablement un service DNS, à confirmer", "Le poste est forcément compromis", "Le port 53 prouve un serveur web"], correctOption: 0 },
        { question: "Un port ouvert répond, mais la bannière ne correspond pas au service attendu. Que fais-tu ?", options: ["Tu notes une hypothèse et tu vérifies avec le contexte", "Tu ignores la différence", "Tu déclares le service identifié avec certitude"], correctOption: 0 }
      ],
      en: [
        { question: "A /24 workstation tries to reach an address in another /24. Which check comes first?", options: ["The configured and reachable gateway", "The cable color", "The service brand name"], correctOption: 0 },
        { question: "You see traffic to 10.0.0.8:53 over UDP. Which statement is most careful?", options: ["The host is likely querying DNS, to confirm", "The host is certainly compromised", "Port 53 proves a web server"], correctOption: 0 },
        { question: "An open port responds, but its banner does not match the expected service. What do you do?", options: ["Record a hypothesis and verify with context", "Ignore the difference", "Declare the service identified with certainty"], correctOption: 0 }
      ]
    }
  },
  "local-lab-vm-setup": {
    sections: {
      fr: [
        { title: "Définitions utiles", body: "Un périmètre décrit ce qui est autorisé. L'isolation limite les effets d'une erreur. Un snapshot est un point de retour. Un journal de lab garde les décisions, les observations et les limites de l'exercice." },
        { title: "Mise en situation", body: "Tu veux tester un service vulnérable volontairement. Si tu l'ouvres sur ton réseau principal, tu mélanges apprentissage et risque réel. Dans un lab propre, la VM est isolée, les règles sont écrites, le snapshot existe et tu sais comment revenir à l'état initial." }
      ],
      en: [
        { title: "Useful definitions", body: "Scope describes what is allowed. Isolation limits mistake impact. A snapshot is a return point. A lab journal keeps decisions, observations, and exercise limits." },
        { title: "Scenario", body: "You want to test an intentionally vulnerable service. If you expose it on your main network, you mix learning with real risk. In a clean lab, the VM is isolated, rules are written, a snapshot exists, and you know how to return to baseline." }
      ]
    },
    exercises: {
      fr: [
        { title: "Plan de lab avant démarrage", body: "Rédige une fiche pour deux VM : rôle, réseau, accès autorisés, interdits, snapshot de départ, méthode de reset et critère d'arrêt." },
        { title: "Incident de lab simulé", body: "Imagine qu'une VM de test communique avec une machine personnelle. Écris ce que tu vérifies, ce que tu coupes, et comment tu modifies ton lab pour éviter la répétition." }
      ],
      en: [
        { title: "Lab plan before launch", body: "Write a sheet for two VMs: role, network, allowed access, forbidden actions, initial snapshot, reset method, and stop criterion." },
        { title: "Simulated lab incident", body: "Imagine a test VM communicates with a personal machine. Write what you check, what you cut off, and how you change the lab to prevent recurrence." }
      ]
    },
    quiz: {
      fr: [
        { question: "Tu télécharges une VM vulnérable pour t'entraîner. Quel choix est le plus sûr ?", options: ["La lancer dans un réseau isolé avec snapshot", "La connecter au Wi-Fi familial", "La publier sur Internet pour tester plus vite"], correctOption: 0 },
        { question: "Ton exercice n'a pas de règle d'arrêt. Quel risque principal ?", options: ["Continuer hors périmètre sans t'en rendre compte", "Avoir trop de notes", "Rendre le lab trop lisible"], correctOption: 0 },
        { question: "Après un changement de configuration, le lab ne démarre plus. Qu'est-ce qui aide le plus ?", options: ["Un snapshot et un journal des actions", "Un souvenir approximatif", "Changer de sujet"], correctOption: 0 }
      ],
      en: [
        { question: "You download a vulnerable VM for training. What is the safest choice?", options: ["Run it on an isolated network with a snapshot", "Connect it to the family Wi-Fi", "Publish it online to test faster"], correctOption: 0 },
        { question: "Your exercise has no stop rule. What is the main risk?", options: ["Continuing outside scope without noticing", "Having too many notes", "Making the lab too readable"], correctOption: 0 },
        { question: "After a configuration change, the lab no longer starts. What helps most?", options: ["A snapshot and action journal", "A rough memory", "Changing topic"], correctOption: 0 }
      ]
    }
  },
  "network-map-first-steps": {
    sections: {
      fr: [
        { title: "Définitions utiles", body: "Un actif est un élément qui porte une fonction. Un flux est une communication observée ou attendue. Une zone regroupe des machines avec un niveau d'exposition ou de confiance similaire. Une inconnue est une information à vérifier, pas une faiblesse à inventer." },
        { title: "Mise en situation", body: "On te demande pourquoi un serveur de fichiers reçoit des connexions depuis un poste invité. Au lieu de scanner au hasard, tu construis une carte : source, destination, protocole, port, fréquence, rôle supposé et niveau de confiance. La carte révèle si le flux est attendu ou à investiguer." }
      ],
      en: [
        { title: "Useful definitions", body: "An asset carries a function. A flow is observed or expected communication. A zone groups machines with similar exposure or trust. An unknown is information to verify, not a weakness to invent." },
        { title: "Scenario", body: "You are asked why a file server receives connections from a guest workstation. Instead of scanning randomly, you build a map: source, destination, protocol, port, frequency, expected role, and confidence. The map shows whether the flow is expected or worth investigating." }
      ]
    },
    exercises: {
      fr: [
        { title: "Carte orientée décision", body: "À partir de 5 machines fictives, crée une carte avec zones, rôles, flux attendus, flux douteux et prochaine action. Ajoute un niveau de confiance pour chaque rôle." },
        { title: "Flux à expliquer", body: "Choisis trois flux de lab. Pour chacun, écris une phrase : 'qui parle à qui, sur quoi, pourquoi probablement, et comment vérifier'." }
      ],
      en: [
        { title: "Decision-oriented map", body: "From 5 fictional machines, create a map with zones, roles, expected flows, doubtful flows, and next action. Add a confidence level for each role." },
        { title: "Explain the flow", body: "Choose three lab flows. For each, write: 'who talks to whom, over what, likely why, and how to verify'." }
      ]
    },
    quiz: {
      fr: [
        { question: "Une machine inconnue parle au serveur DNS. Quelle note est la plus utile ?", options: ["Source, destination, port, fréquence, rôle supposé et confiance", "Seulement 'trafic suspect'", "Uniquement l'adresse IP"], correctOption: 0 },
        { question: "Tu n'es pas sûr du rôle d'un hôte. Que fais-tu sur la carte ?", options: ["Tu marques l'hypothèse et le niveau de confiance", "Tu inventes un rôle définitif", "Tu retires l'hôte"], correctOption: 0 },
        { question: "Un flux est inattendu mais faible. Quelle décision est proportionnée ?", options: ["Le documenter et définir une vérification", "Tout bloquer sans contexte", "L'ignorer car il est faible"], correctOption: 0 }
      ],
      en: [
        { question: "An unknown machine talks to the DNS server. Which note is most useful?", options: ["Source, destination, port, frequency, expected role, and confidence", "Only 'suspicious traffic'", "Only the IP address"], correctOption: 0 },
        { question: "You are unsure about a host role. What do you put on the map?", options: ["The hypothesis and confidence level", "A final invented role", "Remove the host"], correctOption: 0 },
        { question: "A flow is unexpected but low volume. What is proportionate?", options: ["Document it and define a verification", "Block everything without context", "Ignore it because it is low volume"], correctOption: 0 }
      ]
    }
  },
  "http-basics": {
    sections: {
      fr: [
        { title: "Définitions utiles", body: "Une requête décrit ce que le client demande. Une réponse décrit ce que le serveur renvoie. Un code 2xx indique généralement une réussite, 3xx une redirection, 4xx un problème côté demande, 5xx un problème côté serveur. Un en-tête ajoute du contexte à l'échange." },
        { title: "Mise en situation", body: "Un utilisateur dit que 'le site est cassé'. Tu captures une transaction : POST /login, réponse 302, cookie de session, redirection vers /dashboard. Ce n'est pas cassé : c'est peut-être une connexion réussie. Lire HTTP évite de juger seulement à l'écran." }
      ],
      en: [
        { title: "Useful definitions", body: "A request describes what the client asks for. A response describes what the server returns. 2xx usually means success, 3xx redirection, 4xx a request-side issue, 5xx a server-side issue. A header adds exchange context." },
        { title: "Scenario", body: "A user says 'the site is broken'. You capture: POST /login, 302 response, session cookie, redirect to /dashboard. That may not be broken: it may be a successful sign-in. Reading HTTP prevents judging only by the screen." }
      ]
    },
    exercises: {
      fr: [
        { title: "Lecture d'une connexion", body: "Décris une transaction de connexion fictive avec méthode, chemin, statut, cookie, redirection et conclusion. Sépare ce qui est observé de ce qui est supposé." },
        { title: "Glossaire HTTP terrain", body: "Définis méthode, chemin, statut, en-tête, cookie et corps de requête avec un exemple d'usage défensif." }
      ],
      en: [
        { title: "Read a sign-in transaction", body: "Describe a fictional sign-in transaction with method, path, status, cookie, redirect, and conclusion. Separate observation from assumption." },
        { title: "Field HTTP glossary", body: "Define method, path, status, header, cookie, and request body with one defensive use example." }
      ]
    },
    quiz: {
      fr: [
        { question: "POST /login renvoie 302 puis un cookie de session. Quelle interprétation est la plus prudente ?", options: ["La connexion a peut-être réussi et redirige", "Le serveur est forcément en erreur", "Le cookie prouve une faille"], correctOption: 0 },
        { question: "Une API renvoie 403 sur une action admin. Que signifie le plus probablement ce statut ?", options: ["La demande est comprise mais non autorisée", "Le serveur n'existe pas", "Le navigateur est trop lent"], correctOption: 0 },
        { question: "Un cookie de session est transmis sans protection suffisante. Quel risque défensif notes-tu ?", options: ["Vol ou réutilisation de session", "Augmentation du débit", "Erreur de typographie"], correctOption: 0 }
      ],
      en: [
        { question: "POST /login returns 302 and a session cookie. What is the most careful interpretation?", options: ["Sign-in may have succeeded and redirected", "The server is certainly failing", "The cookie proves a vulnerability"], correctOption: 0 },
        { question: "An API returns 403 for an admin action. What does that most likely mean?", options: ["The request is understood but not authorized", "The server does not exist", "The browser is too slow"], correctOption: 0 },
        { question: "A session cookie is sent without sufficient protection. What defensive risk do you note?", options: ["Session theft or reuse", "Higher bandwidth", "A typo"], correctOption: 0 }
      ]
    }
  },
  "web-form-basics": {
    sections: {
      fr: [
        { title: "Définitions utiles", body: "La validation client aide l'utilisateur avant l'envoi. La validation serveur décide ce qui est accepté. Une contrainte vérifie type, longueur, format, valeur autorisée ou droit. Un message d'erreur utile corrige sans révéler d'information sensible." },
        { title: "Mise en situation", body: "Un champ 'quantité' accepte seulement 1 à 10 dans l'interface. Un test envoie 999 directement au serveur. Si le serveur accepte, le problème n'est pas l'interface : c'est l'absence de validation côté serveur." }
      ],
      en: [
        { title: "Useful definitions", body: "Client validation helps the user before sending. Server validation decides what is accepted. A constraint checks type, length, format, allowed value, or rights. A useful error helps correction without revealing sensitive information." },
        { title: "Scenario", body: "A 'quantity' field allows only 1 to 10 in the interface. A test sends 999 directly to the server. If the server accepts it, the issue is not the interface: it is missing server-side validation." }
      ]
    },
    exercises: {
      fr: [
        { title: "Contrat de formulaire", body: "Pour un formulaire d'inscription, écris le contrat serveur : champs, types, longueurs, erreurs, droits, cas limites et données à ne jamais accepter." },
        { title: "Cas limite", body: "Imagine trois entrées problématiques : email très long, nom vide, rôle 'admin' ajouté dans la requête. Explique la réponse serveur attendue." }
      ],
      en: [
        { title: "Form contract", body: "For a registration form, write the server contract: fields, types, lengths, errors, rights, edge cases, and data that must never be accepted." },
        { title: "Edge case", body: "Imagine three problematic inputs: very long email, empty name, role 'admin' added to the request. Explain the expected server response." }
      ]
    },
    quiz: {
      fr: [
        { question: "Le navigateur bloque un champ vide, mais une requête directe l'envoie quand même. Où doit se trouver la protection décisive ?", options: ["Côté serveur", "Uniquement dans le HTML", "Dans la couleur du bouton"], correctOption: 0 },
        { question: "Un utilisateur ajoute role=admin dans la soumission. Quelle réponse est saine ?", options: ["Ignorer ou rejeter ce champ non autorisé", "Créer un compte admin", "Masquer l'erreur sans journal"], correctOption: 0 },
        { question: "Une erreur dit 'email déjà utilisé par alice@example.com'. Quel problème ?", options: ["Elle révèle trop d'information", "Elle est trop courte", "Elle utilise HTTP"], correctOption: 0 }
      ],
      en: [
        { question: "The browser blocks an empty field, but a direct request sends it anyway. Where must the decisive protection live?", options: ["On the server", "Only in HTML", "In the button color"], correctOption: 0 },
        { question: "A user adds role=admin to submission. What is a healthy response?", options: ["Ignore or reject the unauthorized field", "Create an admin account", "Hide the error without logs"], correctOption: 0 },
        { question: "An error says 'email already used by alice@example.com'. What is the issue?", options: ["It reveals too much information", "It is too short", "It uses HTTP"], correctOption: 0 }
      ]
    }
  },
  "web-auth-foundations": {
    sections: {
      fr: [
        { title: "Définitions utiles", body: "Authentification : prouver une identité. Session : conserver temporairement cet état. Autorisation : décider ce que cette identité peut faire. MFA : demander un facteur supplémentaire quand le risque le justifie." },
        { title: "Mise en situation", body: "Un utilisateur standard modifie l'URL /users/12 en /users/13 et voit un autre profil. Le mot de passe n'est pas en cause : l'utilisateur est authentifié, mais l'autorisation de l'action n'est pas correctement vérifiée." }
      ],
      en: [
        { title: "Useful definitions", body: "Authentication proves identity. Session keeps that state temporarily. Authorization decides what that identity can do. MFA asks for an extra factor when risk justifies it." },
        { title: "Scenario", body: "A standard user changes /users/12 to /users/13 and sees another profile. The password is not the issue: the user is authenticated, but action authorization is not properly checked." }
      ]
    },
    exercises: {
      fr: [
        { title: "Scénario de droits", body: "Décris un flux où l'utilisateur est connecté mais ne doit pas accéder à une ressource. Écris les contrôles serveur attendus et les journaux utiles." },
        { title: "Table auth/session/autorisation", body: "Pour connexion, changement d'email, suppression de compte et accès admin, indique le contrôle principal, le risque et la réponse en cas d'échec." }
      ],
      en: [
        { title: "Rights scenario", body: "Describe a flow where the user is signed in but must not access a resource. Write expected server checks and useful logs." },
        { title: "Auth/session/authorization table", body: "For sign-in, email change, account deletion, and admin access, list the main check, risk, and failure response." }
      ]
    },
    quiz: {
      fr: [
        { question: "Un utilisateur connecté accède à une facture qui ne lui appartient pas. Quelle famille de problème ?", options: ["Autorisation", "Authentification uniquement", "Compression HTTP"], correctOption: 0 },
        { question: "Après déconnexion, l'ancien cookie fonctionne encore. Quel contrôle manque ?", options: ["Invalidation ou révocation de session", "Validation du nom", "Changement de police"], correctOption: 0 },
        { question: "MFA doit être demandé pour quelle action en priorité ?", options: ["Action sensible comme changer l'email ou retirer des fonds", "Lire une page publique", "Afficher le logo"], correctOption: 0 }
      ],
      en: [
        { question: "A signed-in user accesses an invoice they do not own. What problem family is this?", options: ["Authorization", "Authentication only", "HTTP compression"], correctOption: 0 },
        { question: "After sign-out, the old cookie still works. What check is missing?", options: ["Session invalidation or revocation", "Name validation", "Font change"], correctOption: 0 },
        { question: "MFA should be prioritized for which action?", options: ["Sensitive action like changing email or withdrawing funds", "Reading a public page", "Displaying the logo"], correctOption: 0 }
      ]
    }
  },
  "linux-shell-basics": {
    sections: {
      fr: [
        { title: "Définitions utiles", body: "Un chemin absolu part de /. Un chemin relatif part de l'endroit où tu te trouves. Les permissions se lisent pour propriétaire, groupe et autres. Un journal est une source d'événements, pas une conclusion." },
        { title: "Mise en situation", body: "Un service ne démarre plus. Tu ne modifies rien au départ : tu localises le fichier, lis les permissions, observes les derniers journaux, puis formules une hypothèse. Cette discipline évite d'ajouter une panne à la panne." }
      ],
      en: [
        { title: "Useful definitions", body: "An absolute path starts at /. A relative path starts where you are. Permissions are read for owner, group, and others. A log is a source of events, not a conclusion." },
        { title: "Scenario", body: "A service no longer starts. You change nothing at first: locate the file, read permissions, observe recent logs, then form a hypothesis. This discipline avoids adding a failure to the failure." }
      ]
    },
    exercises: {
      fr: [
        { title: "Enquête sans modification", body: "Écris une procédure de 8 commandes maximum pour comprendre un fichier suspect : emplacement, type, taille, propriétaire, permissions, dernières lignes associées." },
        { title: "Lecture de permissions", body: "Pour trois exemples de droits fictifs, explique qui peut lire, écrire, exécuter, et quel risque cela crée pour un service." }
      ],
      en: [
        { title: "Investigation without modification", body: "Write a procedure of up to 8 commands to understand a suspicious file: location, type, size, owner, permissions, related recent lines." },
        { title: "Permission reading", body: "For three fictional permission examples, explain who can read, write, execute, and what risk that creates for a service." }
      ]
    },
    quiz: {
      fr: [
        { question: "Tu analyses un fichier inconnu sur un serveur. Quel réflexe vient avant suppression ?", options: ["Observer type, chemin, propriétaire et contexte", "Supprimer pour gagner du temps", "Changer toutes les permissions"], correctOption: 0 },
        { question: "Un journal montre une erreur à 10:42. Quelle conclusion est correcte ?", options: ["C'est un indice à corréler", "C'est forcément la cause racine", "Il faut ignorer l'heure"], correctOption: 0 },
        { question: "Un fichier de configuration est modifiable par 'others'. Quel risque ?", options: ["Modification non prévue par un utilisateur non autorisé", "Lecture plus rapide", "Moins de logs"], correctOption: 0 }
      ],
      en: [
        { question: "You analyze an unknown file on a server. What comes before deletion?", options: ["Observe type, path, owner, and context", "Delete it to save time", "Change all permissions"], correctOption: 0 },
        { question: "A log shows an error at 10:42. What conclusion is correct?", options: ["It is a clue to correlate", "It is certainly the root cause", "The time should be ignored"], correctOption: 0 },
        { question: "A configuration file is writable by 'others'. What is the risk?", options: ["Unexpected modification by an unauthorized user", "Faster reading", "Fewer logs"], correctOption: 0 }
      ]
    }
  },
  "linux-service-hardening": {
    sections: {
      fr: [
        { title: "Définitions utiles", body: "Le moindre privilège donne seulement les droits nécessaires. La surface d'exposition regroupe ports, fichiers, comptes et actions accessibles. Un rollback est une méthode de retour arrière testable." },
        { title: "Mise en situation", body: "Un service de lab tourne en root alors qu'il lit seulement un dossier et écoute localement. Tu crées un utilisateur dédié, limites les fichiers accessibles, vérifies le port exposé et gardes un plan de retour arrière avant de changer la configuration." }
      ],
      en: [
        { title: "Useful definitions", body: "Least privilege gives only necessary rights. Exposure surface includes ports, files, accounts, and available actions. A rollback is a testable return method." },
        { title: "Scenario", body: "A lab service runs as root while it only reads a directory and listens locally. You create a dedicated user, limit accessible files, verify exposed port, and keep a rollback plan before changing configuration." }
      ]
    },
    exercises: {
      fr: [
        { title: "Plan de durcissement progressif", body: "Pour un service fictif, écris l'état initial, les droits nécessaires, les droits à retirer, la vérification après changement et le rollback." },
        { title: "Analyse d'exposition", body: "Liste port, utilisateur, fichiers lus, fichiers écrits, journaux et dépendances. Pour chaque élément, indique 'nécessaire', 'à vérifier' ou 'à retirer'." }
      ],
      en: [
        { title: "Progressive hardening plan", body: "For a fictional service, write initial state, required rights, rights to remove, post-change verification, and rollback." },
        { title: "Exposure analysis", body: "List port, user, read files, written files, logs, and dependencies. For each, mark 'necessary', 'to verify', or 'to remove'." }
      ]
    },
    quiz: {
      fr: [
        { question: "Un service web local tourne en root sans besoin clair. Quelle action est la plus saine ?", options: ["Créer un utilisateur dédié et tester", "Laisser ainsi par confort", "Supprimer les journaux"], correctOption: 0 },
        { question: "Avant de durcir un service en production, que prépares-tu ?", options: ["État initial, test et rollback", "Seulement une intention", "Un changement irréversible"], correctOption: 0 },
        { question: "Après changement, le service démarre mais n'écrit plus ses logs. Quelle lecture ?", options: ["Un droit nécessaire a peut-être été retiré", "Le durcissement est forcément parfait", "Les logs ne servent jamais"], correctOption: 0 }
      ],
      en: [
        { question: "A local web service runs as root without a clear need. What is the healthiest action?", options: ["Create a dedicated user and test", "Leave it for comfort", "Delete logs"], correctOption: 0 },
        { question: "Before hardening a production service, what do you prepare?", options: ["Initial state, test, and rollback", "Only an intention", "An irreversible change"], correctOption: 0 },
        { question: "After change, the service starts but no longer writes logs. What does that suggest?", options: ["A necessary right may have been removed", "Hardening is certainly perfect", "Logs are never useful"], correctOption: 0 }
      ]
    }
  },
  "ctf-evidence-notes": {
    sections: {
      fr: [
        { title: "Définitions utiles", body: "Une hypothèse explique ce que tu penses tester. Une observation décrit ce que tu vois. Une preuve relie une observation à un contexte. Une conclusion dit ce qui est validé, réfuté ou encore incertain." },
        { title: "Mise en situation", body: "Tu réussis un défi CTF, mais tu n'as gardé que la commande finale. Une semaine plus tard, impossible d'expliquer ta méthode. Avec une note exploitable, tu gardes le contexte, les essais ratés, la preuve et la décision qui t'a fait avancer." }
      ],
      en: [
        { title: "Useful definitions", body: "A hypothesis explains what you think you are testing. An observation describes what you see. Evidence connects an observation to context. A conclusion states what is validated, refuted, or still uncertain." },
        { title: "Scenario", body: "You complete a CTF challenge, but only kept the final command. A week later, you cannot explain your method. With a useful note, you keep context, failed attempts, evidence, and the decision that moved you forward." }
      ]
    },
    exercises: {
      fr: [
        { title: "Note complète en 6 blocs", body: "Rédige une note de lab avec contexte, objectif, hypothèse, action, observation, conclusion. Ajoute une capture ou sortie fictive et son interprétation." },
        { title: "Transformer un résultat en méthode", body: "Prends une commande finale de lab et reconstruis les étapes qui auraient dû être notées pour rendre la méthode réutilisable." }
      ],
      en: [
        { title: "Complete 6-block note", body: "Write a lab note with context, goal, hypothesis, action, observation, conclusion. Add a fictional screenshot or output and its interpretation." },
        { title: "Turn result into method", body: "Take a final lab command and reconstruct the steps that should have been noted to make the method reusable." }
      ]
    },
    quiz: {
      fr: [
        { question: "Tu as une capture sans date ni contexte. Quel est le problème ?", options: ["La preuve est fragile et difficile à vérifier", "La capture devient automatiquement meilleure", "Le contexte est inutile"], correctOption: 0 },
        { question: "Une hypothèse échoue pendant un lab. Quelle note est utile ?", options: ["Ce qui a été testé, observé et pourquoi c'est rejeté", "Rien, seuls les succès comptent", "Effacer les essais"], correctOption: 0 },
        { question: "Une bonne conclusion de lab doit inclure quoi ?", options: ["Appris, incertain, prochaine action", "Seulement 'réussi'", "Un score sans explication"], correctOption: 0 }
      ],
      en: [
        { question: "You have a screenshot without date or context. What is the issue?", options: ["The evidence is fragile and hard to verify", "The screenshot automatically becomes better", "Context is useless"], correctOption: 0 },
        { question: "A hypothesis fails during a lab. What note is useful?", options: ["What was tested, observed, and why it is rejected", "Nothing, only successes count", "Erase attempts"], correctOption: 0 },
        { question: "A good lab conclusion should include what?", options: ["Learned, uncertain, next action", "Only 'success'", "A score without explanation"], correctOption: 0 }
      ]
    }
  },
  "infrastructure-asset-baseline": {
    sections: {
      fr: [
        { title: "Définitions utiles", body: "Un actif porte une fonction. Une dépendance est ce dont il a besoin pour fonctionner. Une exposition décrit qui peut l'atteindre. Une priorité combine criticité, exposition, fragilité et incertitude." },
        { title: "Mise en situation", body: "Une petite équipe possède un serveur web, une base de données, un NAS et un compte d'administration partagé. L'inventaire utile ne liste pas seulement des noms : il montre que le NAS dépend du compte admin et que la base n'a pas de sauvegarde vérifiée." }
      ],
      en: [
        { title: "Useful definitions", body: "An asset carries a function. A dependency is what it needs to operate. Exposure describes who can reach it. Priority combines criticality, exposure, fragility, and uncertainty." },
        { title: "Scenario", body: "A small team has a web server, database, NAS, and shared admin account. A useful inventory does not only list names: it shows the NAS depends on the admin account and the database has no verified backup." }
      ]
    },
    exercises: {
      fr: [
        { title: "Inventaire en contexte", body: "Crée une fiche pour 4 actifs : rôle, propriétaire, dépendances, exposition, sauvegarde, priorité et inconnue la plus dangereuse." },
        { title: "Décision de protection", body: "À partir de ton inventaire, choisis l'actif à traiter en premier et justifie avec exposition, impact et incertitude." }
      ],
      en: [
        { title: "Context inventory", body: "Create a sheet for 4 assets: role, owner, dependencies, exposure, backup, priority, and most dangerous unknown." },
        { title: "Protection decision", body: "From your inventory, choose the first asset to handle and justify with exposure, impact, and uncertainty." }
      ]
    },
    quiz: {
      fr: [
        { question: "Un serveur peu critique est exposé à Internet et mal compris. Pourquoi peut-il être prioritaire ?", options: ["Son exposition et l'incertitude augmentent le risque", "Son nom est court", "Il a peu d'utilisateurs"], correctOption: 0 },
        { question: "Une sauvegarde existe mais n'a jamais été restaurée. Comment la noter ?", options: ["Dépendance incertaine à vérifier", "Protection prouvée", "Information inutile"], correctOption: 0 },
        { question: "Un compte admin partagé apparaît dans l'inventaire. Quel risque principal ?", options: ["Responsabilité et révocation difficiles", "Connexion plus rapide", "Moins de dépendances"], correctOption: 0 }
      ],
      en: [
        { question: "A low-criticality server is internet-exposed and poorly understood. Why can it be priority?", options: ["Exposure and uncertainty increase risk", "Its name is short", "It has few users"], correctOption: 0 },
        { question: "A backup exists but has never been restored. How do you record it?", options: ["Uncertain dependency to verify", "Proven protection", "Useless information"], correctOption: 0 },
        { question: "A shared admin account appears in inventory. What is the main risk?", options: ["Accountability and revocation are difficult", "Faster sign-in", "Fewer dependencies"], correctOption: 0 }
      ]
    }
  },
  "opsec-public-footprint-review": {
    sections: {
      fr: [
        { title: "Définitions utiles", body: "Une empreinte publique est l'ensemble des informations accessibles sans intrusion. Une corrélation relie plusieurs détails faibles. Une réduction de risque supprime, limite ou sépare une information exploitable." },
        { title: "Mise en situation", body: "Un profil public affiche ville, employeur, technologies, horaires de publication et photos de badge floutées. Pris séparément, chaque détail semble banal. Ensemble, ils peuvent aider à cibler une personne ou deviner un processus interne." }
      ],
      en: [
        { title: "Useful definitions", body: "A public footprint is the set of information reachable without intrusion. Correlation links several weak details. Risk reduction removes, limits, or separates exploitable information." },
        { title: "Scenario", body: "A public profile shows city, employer, technologies, posting schedule, and blurred badge photos. Separately, each detail seems ordinary. Together, they can help target a person or infer an internal process." }
      ]
    },
    exercises: {
      fr: [
        { title: "Revue par corrélation", body: "Analyse un profil de test : note 10 informations, puis regroupe celles qui deviennent sensibles quand elles sont combinées." },
        { title: "Plan de réduction", body: "Pour chaque information risquée, propose une action : retirer, généraliser, séparer l'identité, limiter l'audience ou surveiller." }
      ],
      en: [
        { title: "Correlation review", body: "Analyze a test profile: record 10 pieces of information, then group those that become sensitive when combined." },
        { title: "Reduction plan", body: "For each risky piece of information, propose an action: remove, generalize, separate identity, limit audience, or monitor." }
      ]
    },
    quiz: {
      fr: [
        { question: "Une bio publique mentionne ville, outil interne et horaires. Quel risque réaliste ?", options: ["Corrélation utile pour ciblage ou usurpation", "Aucun, chaque détail est banal", "Uniquement un problème esthétique"], correctOption: 0 },
        { question: "Tu veux réduire ton empreinte sans disparaître. Quelle action est saine ?", options: ["Généraliser les détails inutiles et séparer les identités", "Tout publier puis espérer", "Supprimer seulement les anciennes photos"], correctOption: 0 },
        { question: "Une information devient sensible surtout quand...", options: ["Elle aide une déduction ou une action contre toi", "Elle contient moins de 5 mots", "Elle est en français"], correctOption: 0 }
      ],
      en: [
        { question: "A public bio mentions city, internal tool, and schedule. What realistic risk appears?", options: ["Useful correlation for targeting or impersonation", "None, each detail is ordinary", "Only an aesthetic issue"], correctOption: 0 },
        { question: "You want to reduce footprint without disappearing. What is healthy?", options: ["Generalize unnecessary details and separate identities", "Publish everything and hope", "Only delete old photos"], correctOption: 0 },
        { question: "Information becomes sensitive especially when...", options: ["It helps an inference or action against you", "It has fewer than 5 words", "It is in French"], correctOption: 0 }
      ]
    }
  },
  "crypto-hashing-and-passwords": {
    sections: {
      fr: [
        { title: "Définitions utiles", body: "Un hash produit une empreinte. Un sel rend deux empreintes différentes même si deux mots de passe sont identiques. Une fonction de dérivation de mot de passe est volontairement coûteuse. Le chiffrement est réversible avec une clé, contrairement au hash." },
        { title: "Mise en situation", body: "Deux utilisateurs ont le même mot de passe. Sans sel, leurs empreintes se ressemblent et facilitent les comparaisons. Avec un sel unique et une fonction adaptée, chaque stockage devient plus difficile à attaquer massivement." }
      ],
      en: [
        { title: "Useful definitions", body: "A hash produces a fingerprint. A salt makes two fingerprints different even if two passwords are identical. A password derivation function is deliberately costly. Encryption is reversible with a key, unlike hashing." },
        { title: "Scenario", body: "Two users have the same password. Without salt, their fingerprints match and comparisons are easier. With unique salt and a suitable function, each stored value becomes harder to attack at scale." }
      ]
    },
    exercises: {
      fr: [
        { title: "Analyse de stockage", body: "Compare trois stockages fictifs : mot de passe clair, SHA rapide sans sel, fonction lente avec sel. Pour chacun, note le risque et la correction." },
        { title: "Expliquer sans jargon", body: "Explique à un collègue non technique la différence entre hash, chiffrement, sel et fonction lente avec une analogie prudente." }
      ],
      en: [
        { title: "Storage analysis", body: "Compare three fictional storage choices: clear password, fast SHA without salt, slow function with salt. For each, record risk and correction." },
        { title: "Explain without jargon", body: "Explain to a non-technical colleague the difference between hash, encryption, salt, and slow function using a careful analogy." }
      ]
    },
    quiz: {
      fr: [
        { question: "Deux utilisateurs ont la même empreinte de mot de passe. Quelle hypothèse défensive ?", options: ["Sel absent ou mal utilisé", "Chiffrement parfait", "MFA activé"], correctOption: 0 },
        { question: "Une équipe veut 'déchiffrer' un hash pour récupérer le mot de passe. Que réponds-tu ?", options: ["Un hash ne se déchiffre pas ; on vérifie par comparaison contrôlée", "Il suffit de demander la clé", "Il faut changer le port"], correctOption: 0 },
        { question: "Pourquoi une fonction lente aide contre les attaques de mots de passe ?", options: ["Elle rend chaque essai plus coûteux", "Elle raccourcit le mot de passe", "Elle supprime le besoin de sel"], correctOption: 0 }
      ],
      en: [
        { question: "Two users have the same password fingerprint. What defensive hypothesis appears?", options: ["Salt is missing or misused", "Perfect encryption", "MFA enabled"], correctOption: 0 },
        { question: "A team wants to 'decrypt' a hash to recover the password. What do you say?", options: ["A hash is not decrypted; it is verified by controlled comparison", "Just ask for the key", "Change the port"], correctOption: 0 },
        { question: "Why does a slow function help against password attacks?", options: ["It makes each attempt more costly", "It shortens the password", "It removes the need for salt"], correctOption: 0 }
      ]
    }
  },
  "forensics-timeline-first-pass": {
    sections: {
      fr: [
        { title: "Définitions utiles", body: "Un artefact est une trace observable. Une chronologie ordonne les traces. Une hypothèse explique une séquence possible. Le niveau de confiance indique si l'information est observée, déduite, probable ou incertaine." },
        { title: "Mise en situation", body: "Trois journaux donnent des heures différentes autour d'une connexion suspecte. Avant de raconter une histoire, tu notes source, fuseau, précision et incertitude. La chronologie devient fiable parce qu'elle montre aussi ses limites." }
      ],
      en: [
        { title: "Useful definitions", body: "An artifact is an observable trace. A timeline orders traces. A hypothesis explains a possible sequence. Confidence level shows whether information is observed, inferred, probable, or uncertain." },
        { title: "Scenario", body: "Three logs show different times around a suspicious sign-in. Before telling a story, you record source, time zone, precision, and uncertainty. The timeline becomes reliable because it also shows its limits." }
      ]
    },
    exercises: {
      fr: [
        { title: "Chronologie avec incertitude", body: "Crée 8 événements fictifs avec heure, source, fait observé, hypothèse, confiance et question ouverte. Ajoute un cas où le fuseau horaire change la lecture." },
        { title: "Fait vs hypothèse", body: "Réécris 5 phrases trop affirmatives en séparant ce qui est observé de ce qui est seulement probable." }
      ],
      en: [
        { title: "Timeline with uncertainty", body: "Create 8 fictional events with time, source, observed fact, hypothesis, confidence, and open question. Add one case where time zone changes interpretation." },
        { title: "Fact vs hypothesis", body: "Rewrite 5 overly assertive sentences by separating observed facts from what is only probable." }
      ]
    },
    quiz: {
      fr: [
        { question: "Deux logs semblent inverser l'ordre des événements. Quel réflexe ?", options: ["Vérifier fuseau, source de temps et précision", "Choisir celui qui arrange l'histoire", "Supprimer un log"], correctOption: 0 },
        { question: "Une ligne indique 'probable exécution'. Comment la noter ?", options: ["Comme hypothèse avec niveau de confiance", "Comme fait certain", "Comme donnée inutile"], correctOption: 0 },
        { question: "Pourquoi une chronologie ne doit-elle pas devenir trop vite un récit ?", options: ["Le récit peut masquer les incertitudes", "Les récits sont interdits", "Les heures suffisent toujours"], correctOption: 0 }
      ],
      en: [
        { question: "Two logs seem to reverse event order. What is the reflex?", options: ["Check time zone, time source, and precision", "Choose the one that fits the story", "Delete one log"], correctOption: 0 },
        { question: "A line says 'probable execution'. How do you record it?", options: ["As a hypothesis with confidence level", "As a certain fact", "As useless data"], correctOption: 0 },
        { question: "Why should a timeline not become a story too quickly?", options: ["The story can hide uncertainty", "Stories are forbidden", "Times are always enough"], correctOption: 0 }
      ]
    }
  },
  "blue-team-alert-triage": {
    sections: {
      fr: [
        { title: "Définitions utiles", body: "Une alerte est un signal. Un faux positif est une alerte expliquée sans incident. L'escalade transmet un cas avec preuves suffisantes. Un critère de sortie dit quand arrêter la surveillance ou changer d'action." },
        { title: "Mise en situation", body: "Une alerte signale une connexion admin à 02:13. Avant de paniquer, tu vérifies le rôle du compte, l'historique, la source, le changement planifié éventuel et les actions après connexion. Le triage réduit l'incertitude avant l'escalade." }
      ],
      en: [
        { title: "Useful definitions", body: "An alert is a signal. A false positive is an explained alert without incident. Escalation transfers a case with enough evidence. An exit criterion says when to stop monitoring or change action." },
        { title: "Scenario", body: "An alert reports an admin sign-in at 02:13. Before panicking, you check account role, history, source, possible planned change, and actions after sign-in. Triage reduces uncertainty before escalation." }
      ]
    },
    exercises: {
      fr: [
        { title: "Ticket de triage complet", body: "Rédige un ticket avec signal, contexte, hypothèses, preuves présentes, preuves manquantes, décision et critère de sortie." },
        { title: "Trois décisions", body: "Pour trois alertes fictives, choisis faux positif, surveillance ou escalade. Justifie avec contexte et preuve." }
      ],
      en: [
        { title: "Complete triage ticket", body: "Write a ticket with signal, context, hypotheses, available evidence, missing evidence, decision, and exit criterion." },
        { title: "Three decisions", body: "For three fictional alerts, choose false positive, monitoring, or escalation. Justify with context and evidence." }
      ]
    },
    quiz: {
      fr: [
        { question: "Une alerte critique touche un serveur de test isolé. Quelle question change la priorité ?", options: ["Quel est le rôle réel et l'exposition de l'actif ?", "Quelle est la couleur de l'alerte ?", "Combien de mots dans le titre ?"], correctOption: 0 },
        { question: "Tu escalades une alerte. Que doit contenir le dossier ?", options: ["Signal, contexte, preuves et décision demandée", "Seulement 'urgent'", "Une capture sans explication"], correctOption: 0 },
        { question: "Une surveillance est choisie. Qu'est-ce qui manque souvent ?", options: ["Un critère de sortie clair", "Un logo", "Un score arbitraire"], correctOption: 0 }
      ],
      en: [
        { question: "A critical alert affects an isolated test server. Which question changes priority?", options: ["What is the asset's real role and exposure?", "What color is the alert?", "How many words are in the title?"], correctOption: 0 },
        { question: "You escalate an alert. What must the case contain?", options: ["Signal, context, evidence, and requested decision", "Only 'urgent'", "A screenshot without explanation"], correctOption: 0 },
        { question: "Monitoring is chosen. What is often missing?", options: ["A clear exit criterion", "A logo", "An arbitrary score"], correctOption: 0 }
      ]
    }
  },
  "ethical-red-team-scope-and-reporting": {
    sections: {
      fr: [
        { title: "Définitions utiles", body: "Le périmètre fixe les cibles, dates, limites et contacts. Une preuve responsable montre le risque sans dommage. Une recommandation transforme l'observation en action défensive. Une règle d'arrêt protège la mission et les personnes." },
        { title: "Mise en situation", body: "Un client autorise un test sur app.example.test mais pas sur le VPN ni les comptes employés. Si tu découvres un lien vers le VPN, la bonne décision n'est pas d'explorer : tu notes, demandes clarification et restes dans le périmètre." }
      ],
      en: [
        { title: "Useful definitions", body: "Scope fixes targets, dates, limits, and contacts. Responsible evidence shows risk without damage. A recommendation turns observation into defensive action. A stop rule protects the mission and people." },
        { title: "Scenario", body: "A client authorizes testing app.example.test but not VPN or employee accounts. If you discover a link to the VPN, the right decision is not to explore: record it, ask for clarification, and stay in scope." }
      ]
    },
    exercises: {
      fr: [
        { title: "Périmètre exploitable", body: "Écris une fiche de mission : objectifs, cibles autorisées, cibles interdites, horaires, contacts, preuves acceptables, règle d'arrêt et livrables." },
        { title: "Transformer une preuve", body: "À partir d'une observation fictive, rédige impact, preuve responsable, recommandation, priorité et vérification attendue.", premium: true }
      ],
      en: [
        { title: "Usable scope", body: "Write a mission sheet: goals, authorized targets, forbidden targets, hours, contacts, acceptable evidence, stop rule, and deliverables." },
        { title: "Turn evidence into remediation", body: "From a fictional observation, write impact, responsible evidence, recommendation, priority, and expected verification.", premium: true }
      ]
    },
    quiz: {
      fr: [
        { question: "Pendant une mission autorisée, tu trouves une cible proche mais hors périmètre. Que fais-tu ?", options: ["Tu documentes et demandes clarification sans tester", "Tu testes vite avant d'oublier", "Tu l'ignores dans le rapport"], correctOption: 0 },
        { question: "Une preuve montre un risque mais expose des données sensibles. Quelle approche ?", options: ["Réduire la preuve au minimum utile et protéger le détail", "Publier tout pour convaincre", "Supprimer le constat"], correctOption: 0 },
        { question: "Une recommandation utile doit être...", options: ["Actionnable et vérifiable", "Spectaculaire", "Vague pour rester flexible"], correctOption: 0 }
      ],
      en: [
        { question: "During an authorized mission, you find a nearby but out-of-scope target. What do you do?", options: ["Document and ask for clarification without testing", "Test quickly before forgetting", "Ignore it in the report"], correctOption: 0 },
        { question: "Evidence shows risk but exposes sensitive data. What approach?", options: ["Reduce evidence to the useful minimum and protect detail", "Publish everything to convince", "Delete the finding"], correctOption: 0 },
        { question: "A useful recommendation must be...", options: ["Actionable and verifiable", "Spectacular", "Vague to stay flexible"], correctOption: 0 }
      ]
    }
  }
} satisfies Record<string, CourseEnhancement>;

for (const [slug, enhancement] of Object.entries(courseEnhancements)) {
  const course = courses.find((item) => item.slug === slug);

  if (course) {
    course.sections.fr = [...course.sections.fr, ...enhancement.sections.fr];
    course.sections.en = [...course.sections.en, ...enhancement.sections.en];
    course.exercises = enhancement.exercises;
    course.quiz = enhancement.quiz;
  }
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export function getCoursesByCategory(categorySlug: string) {
  return courses.filter((course) => course.categorySlug === categorySlug);
}
