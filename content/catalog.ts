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
  exercises: Record<Locale, { title: string; body: string; premium?: boolean; solution?: string }[]>;
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
        { question: "Pourquoi la validation client ne suffit-elle pas ?", options: ["Elle peut être contournée", "Elle est toujours lente", "Elle bloqué les logs"], correctOption: 0 },
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
      fr: [{ label: "CNIL - Maîtriser son identité numérique", url: "https://www.cnil.fr/fr/maitriser-mes-données" }],
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
        { title: "Le sel cassé les comparaisons simples", body: "Un sel est une valeur unique ajoutée avant le calcul. Il empêche deux utilisateurs avec le même mot de passe d'avoir la même empreinte et rend les tables pré-calculées beaucoup moins utiles." },
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

type FoundationCourseInput = {
  slug: string;
  categorySlug: string;
  level: Level;
  isPremium?: boolean;
  estimatedMinutes: number;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  concepts: Record<Locale, string>;
  scenario: Record<Locale, string>;
  mistake: Record<Locale, string>;
  method: Record<Locale, string>;
  exercise: Record<Locale, { title: string; body: string; solution: string }>;
  quiz: Record<Locale, QuizQuestion[]>;
};

const resourceByCategory: Record<string, Record<Locale, { label: string; url: string }[]>> = {
  "blue-team": {
    fr: [{ label: "NIST Computer Security Incident Handling Guide", url: "https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final" }],
    en: [{ label: "NIST Computer Security Incident Handling Guide", url: "https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final" }]
  },
  "cryptography": {
    fr: [{ label: "NIST Cryptographic Standards and Guidelines", url: "https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines" }],
    en: [{ label: "NIST Cryptographic Standards and Guidelines", url: "https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines" }]
  },
  "ctf-labs": {
    fr: [{ label: "OWASP WebGoat", url: "https://owasp.org/www-project-webgoat/" }],
    en: [{ label: "OWASP WebGoat", url: "https://owasp.org/www-project-webgoat/" }]
  },
  "ethical-red-team": {
    fr: [{ label: "OWASP Testing Guide", url: "https://owasp.org/www-project-web-security-testing-guide/" }],
    en: [{ label: "OWASP Testing Guide", url: "https://owasp.org/www-project-web-security-testing-guide/" }]
  },
  "forensics": {
    fr: [{ label: "NIST Digital Forensics", url: "https://www.nist.gov/forensics" }],
    en: [{ label: "NIST Digital Forensics", url: "https://www.nist.gov/forensics" }]
  },
  "hardware-infrastructure": {
    fr: [{ label: "CIS Controls", url: "https://www.cisecurity.org/controls" }],
    en: [{ label: "CIS Controls", url: "https://www.cisecurity.org/controls" }]
  },
  "linux": {
    fr: [{ label: "Linux man-pages project", url: "https://www.kernel.org/doc/man-pages/" }],
    en: [{ label: "Linux man-pages project", url: "https://www.kernel.org/doc/man-pages/" }]
  },
  "network": {
    fr: [{ label: "Practical Networking - Fundamentals", url: "https://www.practicalnetworking.net/" }],
    en: [{ label: "Practical Networking - Fundamentals", url: "https://www.practicalnetworking.net/" }]
  },
  "opsec": {
    fr: [{ label: "NIST Privacy Framework", url: "https://www.nist.gov/privacy-framework" }],
    en: [{ label: "NIST Privacy Framework", url: "https://www.nist.gov/privacy-framework" }]
  },
  "web-security": {
    fr: [{ label: "OWASP Cheat Sheet Series", url: "https://cheatsheetseries.owasp.org/" }],
    en: [{ label: "OWASP Cheat Sheet Series", url: "https://cheatsheetseries.owasp.org/" }]
  }
};

function buildFoundationCourse(input: FoundationCourseInput): Course {
  return {
    slug: input.slug,
    categorySlug: input.categorySlug,
    level: input.level,
    isPremium: input.isPremium ?? false,
    estimatedMinutes: input.estimatedMinutes,
    title: input.title,
    summary: input.summary,
    objectives: {
      fr: ["Comprendre le vocabulaire essentiel", "Lire une situation simple sans paniquer", "Produire une décision ou une note vérifiable"],
      en: ["Understand essential vocabulary", "Read a simple situation without panic", "Produce a verifiable decision or note"]
    },
    prerequisites: noPrereq,
    sections: {
      fr: [
        { title: "Mot par mot", body: input.concepts.fr },
        { title: "Exemple guidé pas à pas", body: input.scenario.fr },
        { title: "Erreur classique à éviter", body: input.mistake.fr },
        { title: "Méthode à retenir", body: input.method.fr }
      ],
      en: [
        { title: "Word by word", body: input.concepts.en },
        { title: "Guided example step by step", body: input.scenario.en },
        { title: "Common trap to avoid", body: input.mistake.en },
        { title: "Method to remember", body: input.method.en }
      ]
    },
    resources: resourceByCategory[input.categorySlug],
    exercises: {
      fr: [{ ...input.exercise.fr, solution: input.exercise.fr.solution }],
      en: [{ ...input.exercise.en, solution: input.exercise.en.solution }]
    },
    quiz: input.quiz
  };
}

const foundationCourseInputs: FoundationCourseInput[] = [
  {
    slug: "dns-dhcp-foundations",
    categorySlug: "network",
    level: "beginner",
    estimatedMinutes: 55,
    title: { fr: "DNS et DHCP sans jargon", en: "DNS and DHCP without jargon" },
    summary: { fr: "Comprendre comment un poste trouve un nom, obtient une adresse et rejoint le réseau.", en: "Understand how a host resolves a name, gets an address, and joins the network." },
    concepts: { fr: "DNS transforme un nom lisible en adresse. DHCP distribue automatiquement une adresse, un masque, une passerelle et souvent des serveurs DNS. Bail veut dire durée de location d'une adresse. Résolution veut dire recherche du nom. Cache veut dire réponse gardée temporairement.", en: "DNS turns a readable name into an address. DHCP automatically gives an address, mask, gateway, and often DNS servers. Lease means temporary address rental. Resolution means name lookup. Cache means an answer kept temporarily." },
    scenario: { fr: "Un poste ouvre intranet.local. Il demande d'abord au DNS où se trouve ce nom. Si le poste n'a pas d'adresse, il demande d'abord au DHCP une configuration. Tu lis donc l'ordre : obtenir une identité réseau, connaître la sortie, puis trouver le service par son nom.", en: "A workstation opens intranet.local. It first asks DNS where that name is. If it has no address, it first asks DHCP for configuration. Read the order: get network identity, know the exit, then find the service by name." },
    mistake: { fr: "Confondre DNS et Internet. DNS peut exister dans un lab local et ne prouve pas que le service est accessible. Autre erreur : changer une IP à la main sans noter le DHCP, ce qui peut créer des conflits.", en: "Do not confuse DNS with the Internet. DNS can exist in a local lab and does not prove the service is reachable. Another mistake is changing an IP manually without checking DHCP, creating conflicts." },
    method: { fr: "Quand un poste ne joint pas un service par nom, vérifie l'adresse du poste, le bail DHCP, la passerelle, le serveur DNS, la résolution du nom, puis seulement l'accès au service.", en: "When a host cannot reach a service by name, check host address, DHCP lease, gateway, DNS server, name resolution, then service access." },
    exercise: {
      fr: { title: "Diagnostic DNS/DHCP", body: "Un poste a une adresse automatique bizarre et ne résout pas intranet.local. Liste les contrôles dans l'ordre et ce que chaque résultat permet de conclure.", solution: "Correction : vérifier si l'adresse vient du DHCP attendu, contrôler masque/passerelle/DNS, tester la résolution du nom, tester l'adresse directe du service, puis comparer avec un autre poste. Cela sépare problème d'adressage, DNS ou service." },
      en: { title: "DNS/DHCP diagnostic", body: "A host has an odd automatic address and cannot resolve intranet.local. List checks in order and what each result proves.", solution: "Correction: check whether the address came from expected DHCP, verify mask/gateway/DNS, test name resolution, test direct service address, compare with another host. This separates addressing, DNS, or service issues." }
    },
    quiz: {
      fr: [
        { question: "Un poste n'a pas d'adresse correcte. Que vérifier d'abord ?", options: ["Le bail ou serveur DHCP attendu", "Le certificat TLS", "La couleur du navigateur"], correctOption: 0 },
        { question: "DNS sert principalement à...", options: ["Associer un nom à une adresse", "Chiffrer un fichier", "Donner un rôle admin"], correctOption: 0 },
        { question: "Un nom qui se résout prouve-t-il que le service fonctionne ?", options: ["Non, il faut tester l'accès au service", "Oui, toujours", "Seulement si le nom est court"], correctOption: 0 }
      ],
      en: [
        { question: "A host has no correct address. What do you check first?", options: ["Expected DHCP lease or server", "TLS certificate", "Browser color"], correctOption: 0 },
        { question: "DNS mainly...", options: ["Maps a name to an address", "Encrypts a file", "Grants admin role"], correctOption: 0 },
        { question: "Does name resolution prove the service works?", options: ["No, test service access", "Yes, always", "Only if the name is short"], correctOption: 0 }
      ]
    }
  },
  {
    slug: "subnet-vlan-basics",
    categorySlug: "network",
    level: "beginner",
    estimatedMinutes: 65,
    title: { fr: "Sous-réseaux, VLAN et zones", en: "Subnets, VLANs, and zones" },
    summary: { fr: "Lire une séparation réseau sans se perdre dans les calculs.", en: "Read network separation without getting lost in calculations." },
    concepts: { fr: "Sous-réseau veut dire groupe d'adresses. VLAN veut dire séparation logique sur un équipement réseau. Zone veut dire ensemble avec une intention : postes, serveurs, invites, administration. Segmentation veut dire limiter les communications inutiles.", en: "Subnet means address group. VLAN means logical separation on network equipment. Zone means a group with intent: workstations, servers, guests, administration. Segmentation means limiting unnecessary communications." },
    scenario: { fr: "Un réseau a une zone invites, une zone postes et une zone serveurs. Les invites vont vers Internet, mais pas vers les serveurs internes. Tu lis la segmentation comme une carte de confiance : qui peut parler à qui, pour quelle raison, avec quelle preuve.", en: "A network has guest, workstation, and server zones. Guests go to the Internet but not internal servers. Read segmentation as a trust map: who may talk to whom, why, with which proof." },
    mistake: { fr: "Croire qu'un VLAN est une sécurité magique. Il aide à séparer, mais les règles, routes, pare-feu et tests décident ce qui passe vraiment.", en: "Do not treat a VLAN as magic security. It helps separate, but rules, routes, firewalls, and tests decide what truly passes." },
    method: { fr: "Pour chaque zone, note son rôle, ses adresses, les flux autorisés, les flux interdits et le niveau de confiance. Une zone sans intention claire finit toujours par devenir floue.", en: "For every zone, record role, addresses, allowed flows, forbidden flows, and trust level. A zone without clear intent becomes blurry." },
    exercise: {
      fr: { title: "Carte de zones", body: "Dessine postes, serveurs, invites et administration. Écris trois flux autorisés et trois flux interdits avec justification.", solution: "Correction : les flux autorisés doivent avoir un besoin clair, par exemple postes vers DNS ou web interne. Les interdits protègent les zones sensibles, par exemple invites vers administration. Chaque flèche doit avoir une raison." },
      en: { title: "Zone map", body: "Draw workstations, servers, guests, and administration. Write three allowed and three forbidden flows with justification.", solution: "Correction: allowed flows need a clear need, such as workstations to DNS or internal web. Forbidden flows protect sensitive zones, such as guests to administration. Every arrow needs a reason." }
    },
    quiz: {
      fr: [
        { question: "Une zone réseau doit surtout avoir...", options: ["Une intention claire", "Un nom impressionnant", "Une couleur unique"], correctOption: 0 },
        { question: "Un VLAN suffit-il à prouver qu'un flux est bloqué ?", options: ["Non, il faut vérifier routes et règles", "Oui, toujours", "Seulement le lundi"], correctOption: 0 },
        { question: "La segmentation sert à...", options: ["Limiter les communications inutiles", "Supprimer les sauvegardes", "Éviter toute documentation"], correctOption: 0 }
      ],
      en: [
        { question: "A network zone mainly needs...", options: ["Clear intent", "An impressive name", "One color"], correctOption: 0 },
        { question: "Does a VLAN prove a flow is blocked?", options: ["No, verify routes and rules", "Yes, always", "Only on Monday"], correctOption: 0 },
        { question: "Segmentation is used to...", options: ["Limit unnecessary communications", "Remove backups", "Avoid documentation"], correctOption: 0 }
      ]
    }
  },
  {
    slug: "routing-firewall-basics",
    categorySlug: "network",
    level: "intermediate",
    estimatedMinutes: 70,
    title: { fr: "Routage et filtrage de base", en: "Basic routing and filtering" },
    summary: { fr: "Comprendre pourquoi un paquet passe, bloqué ou prend le mauvais chemin.", en: "Understand why a packet passes, blocks, or takes the wrong path." },
    concepts: { fr: "Route veut dire chemin vers un réseau. Table de routage veut dire liste des chemins connus. Pare-feu veut dire décision autoriser ou bloquer selon source, destination, port, protocole et contexte. État veut dire mémoire d'une connexion.", en: "Route means path to a network. Routing table means known paths. Firewall means allow or block decision based on source, destination, port, protocol, and context. State means memory of a connection." },
    scenario: { fr: "Un poste peut joindre le DNS mais pas l'application interne. Tu regardes si la route existe, si la passerelle sait revenir, si une règle bloqué le port, puis si le service écoute. Tu ne changes pas trois choses à la fois.", en: "A workstation reaches DNS but not the internal app. Check whether route exists, gateway can return, a rule blocks the port, then whether service listens. Do not change three things at once." },
    mistake: { fr: "Conclure 'pare-feu' dès qu'un test échoue. Un échec peut venir d'une route absente, d'un retour impossible, d'un service fermé ou d'une résolution incorrecte.", en: "Do not conclude 'firewall' whenever a test fails. Failure can come from missing route, impossible return path, closed service, or wrong resolution." },
    method: { fr: "Lis dans cet ordre : source, destination, route aller, route retour, règle, service, journal. Cette séquence évite les diagnostics au hasard.", en: "Read in this order: source, destination, outbound route, return route, rule, service, log. This avoids random diagnosis." },
    exercise: {
      fr: { title: "Flux bloqué", body: "Un poste en 10.10.1.20 ne joint pas 10.10.5.10:443. Écris les contrôles sans supposer que le pare-feu est coupable.", solution: "Correction : vérifier IP et masque source, route vers 10.10.5.0, route retour, résolution si nom utilisé, règle source/destination/port, et écoute du service 443. Les journaux confirment ou infirment le filtrage." },
      en: { title: "Blocked flow", body: "A host 10.10.1.20 cannot reach 10.10.5.10:443. Write checks without assuming the firewall is guilty.", solution: "Correction: verify source IP/mask, route to 10.10.5.0, return route, resolution if using a name, source/destination/port rule, and service listening on 443. Logs confirm or refute filtering." }
    },
    quiz: {
      fr: [
        { question: "Avant d'accuser le pare-feu, que vérifier ?", options: ["Routes aller et retour", "La police du terminal", "Le nom du ticket"], correctOption: 0 },
        { question: "Une règle de filtrage lit souvent...", options: ["Source, destination, protocole et port", "Le prénom de l'utilisateur", "Le modèle de souris"], correctOption: 0 },
        { question: "Changer plusieurs choses à la fois rend le diagnostic...", options: ["Moins fiable", "Plus prouvé", "Automatique"], correctOption: 0 }
      ],
      en: [
        { question: "Before blaming the firewall, check...", options: ["Outbound and return routes", "Terminal font", "Ticket name"], correctOption: 0 },
        { question: "A filtering rule often reads...", options: ["Source, destination, protocol, and port", "User first name", "Mouse model"], correctOption: 0 },
        { question: "Changing many things at once makes diagnosis...", options: ["Less reliable", "More proven", "Automatic"], correctOption: 0 }
      ]
    }
  },
  {
    slug: "network-troubleshooting-method",
    categorySlug: "network",
    level: "beginner",
    estimatedMinutes: 60,
    title: { fr: "Méthode de diagnostic réseau", en: "Network troubleshooting method" },
    summary: { fr: "Apprendre une routine simple pour ne pas chercher au hasard.", en: "Learn a simple routine to avoid random troubleshooting." },
    concepts: { fr: "Diagnostic veut dire isoler une cause probable. Symptôme veut dire ce que l'utilisateur voit. Preuve veut dire résultat observé. Hypothèse veut dire cause possible. Reproduction veut dire refaire le problème dans un cadre contrôle.", en: "Diagnosis means isolating a likely cause. Symptom means what the user sees. Evidence means observed result. Hypothesis means possible cause. Reproduction means replaying the issue in a controlled way." },
    scenario: { fr: "On te dit 'Internet ne marche pas'. Tu transformes la phrase en tests : le poste a-t-il une IP, une passerelle, un DNS, une route, un accès par IP, un accès par nom, un problème sur tous les sites ou un seul ?", en: "Someone says 'Internet does not work'. Turn it into tests: does the host have IP, gateway, DNS, route, access by IP, access by name, all sites failing or one?" },
    mistake: { fr: "Chercher une solution avant de définir le symptôme. Sans symptôme précis, tu peux réparer quelque chose qui n'était pas cassé.", en: "Looking for a solution before defining the symptom. Without a precise symptom, you may fix something that was not broken." },
    method: { fr: "Écris symptôme, périmètre, dernier changement, test local, test passerelle, test DNS, test service, comparaison, conclusion. Chaque ligne doit ajouter une preuve.", en: "Write symptom, scope, last change, local test, gateway test, DNS test, service test, comparison, conclusion. Every line must add evidence." },
    exercise: {
      fr: { title: "Routine en 8 lignes", body: "Un utilisateur ne joint pas une application interne. Rédige une routine de diagnostic en 8 lignes maximum.", solution: "Correction : symptôme exact, poste concerné, dernier changement, IP/masque, passerelle, résolution DNS, test port/service, comparaison avec un autre poste, conclusion provisoire." },
      en: { title: "8-line routine", body: "A user cannot reach an internal application. Write a troubleshooting routine in eight lines maximum.", solution: "Correction: exact symptom, affected host, last change, IP/mask, gateway, DNS resolution, port/service test, comparison with another host, provisional conclusion." }
    },
    quiz: {
      fr: [
        { question: "Un symptôme utile doit être...", options: ["Précis et observable", "Dramatique", "Sans contexte"], correctOption: 0 },
        { question: "Une hypothèse devient plus solide avec...", options: ["Une preuve", "Une intuition seule", "Un emoji"], correctOption: 0 },
        { question: "Comparer avec un autre poste sert à...", options: ["Réduire le périmètre", "Remplacer les journaux", "Changer le hasard"], correctOption: 0 }
      ],
      en: [
        { question: "A useful symptom must be...", options: ["Precise and observable", "Dramatic", "Without context"], correctOption: 0 },
        { question: "A hypothesis becomes stronger with...", options: ["Evidence", "Intuition only", "An emoji"], correctOption: 0 },
        { question: "Comparing with another host helps...", options: ["Reduce scope", "Replace logs", "Change luck"], correctOption: 0 }
      ]
    }
  }
];

type QuickFoundationInput = {
  slug: string;
  categorySlug: string;
  level: Level;
  isPremium?: boolean;
  estimatedMinutes: number;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  subject: Record<Locale, string>;
  action: Record<Locale, string>;
  risk: Record<Locale, string>;
  proof: Record<Locale, string>;
};

function buildQuickFoundationCourse(input: QuickFoundationInput): Course {
  return buildFoundationCourse({
    slug: input.slug,
    categorySlug: input.categorySlug,
    level: input.level,
    isPremium: input.isPremium,
    estimatedMinutes: input.estimatedMinutes,
    title: input.title,
    summary: input.summary,
    concepts: {
      fr: `${input.subject.fr}. Commence par nommer les éléments : acteur, actif, action, preuve, limite et décision. Un débutant progresse quand il transforme un mot vague en question observable.`,
      en: `${input.subject.en}. Start by naming the elements: actor, asset, action, evidence, limit, and decision. A beginner progresses by turning vague words into observable questions.`
    },
    scenario: {
      fr: `Situation : ${input.action.fr}. Tu lis d'abord le contexte, tu notes ce qui est certain, tu marques ce qui reste hypothétique, puis tu choisis la vérification la moins risquée.`,
      en: `Situation: ${input.action.en}. First read context, record what is certain, mark what remains hypothetical, then choose the least risky verification.`
    },
    mistake: {
      fr: `Erreur classique : ${input.risk.fr}. Le bon reflexe est de ralentir, séparer fait et interprétation, puis garder une trace de la décision.`,
      en: `Common trap: ${input.risk.en}. The right reflex is to slow down, separate fact and interpretation, then keep a trace of the decision.`
    },
    method: {
      fr: `Méthode : décris le périmètre, liste les preuves disponibles, choisis une seule vérification, note le résultat, puis decide l'étape suivante. La preuve attendue ici est : ${input.proof.fr}.`,
      en: `Method: describe scope, list available evidence, choose one verification, record the result, then decide next step. Expected evidence here is: ${input.proof.en}.`
    },
    exercise: {
      fr: {
        title: "Fiche de mise en situation",
        body: `À partir du scenario du cours, rédige une fiche avec contexte, vocabulaire, preuve disponible, hypothèse, vérification et décision prudente.`,
        solution: `Correction : la fiche doit contenir le contexte, les mots définis, au moins une preuve observable, une hypothèse marquee comme telle, une vérification non destructive et une décision justifiee. Preuve clé : ${input.proof.fr}.`
      },
      en: {
        title: "Scenario sheet",
        body: "Using the course scenario, write a sheet with context, vocabulary, available evidence, hypothesis, verification, and careful decision.",
        solution: `Correction: the sheet should contain context, defined words, at least one observable proof, a hypothesis marked as such, a non-destructive verification, and a justified decision. Key evidence: ${input.proof.en}.`
      }
    },
    quiz: {
      fr: [
        { question: "Dans cette situation, que faut-il séparer en premier ?", options: ["Faits observes et interpretations", "Opinion et vitesse", "Couleurs et icônes"], correctOption: 0 },
        { question: "Quelle vérification est la meilleure pour apprendre proprement ?", options: ["Une vérification limitee, documentee et non destructive", "Un changement massif sans note", "Une supposition rapide"], correctOption: 0 },
        { question: "Une bonne conclusion doit s'appuyer sur...", options: [input.proof.fr, "Une impression seule", "Une phrase vague"], correctOption: 0 }
      ],
      en: [
        { question: "In this situation, what should be separated first?", options: ["Observed facts and interpretations", "Opinion and speed", "Colors and icons"], correctOption: 0 },
        { question: "Which verification is best for clean learning?", options: ["A limited, documented, non-destructive check", "A massive undocumented change", "A fast assumption"], correctOption: 0 },
        { question: "A good conclusion should rely on...", options: [input.proof.en, "A feeling only", "A vague sentence"], correctOption: 0 }
      ]
    }
  });
}

const quickFoundationInputs: QuickFoundationInput[] = [
  {
    slug: "workstation-server-roles",
    categorySlug: "hardware-infrastructure",
    level: "beginner",
    estimatedMinutes: 50,
    title: { fr: "Postes, serveurs et rôles", en: "Workstations, servers, and roles" },
    summary: { fr: "Comprendre qui fait quoi dans une infrastructure simple.", en: "Understand who does what in a simple infrastructure." },
    subject: { fr: "Un poste sert à un utilisateur, un serveur rend un service, une appliance a souvent un rôle spécialisé", en: "A workstation serves a user, a server provides a service, and an appliance often has a specialized role" },
    action: { fr: "tu dois classer cinq machines inconnues sans les modifier", en: "you must classify five unknown machines without modifying them" },
    risk: { fr: "juger une machine uniquement par son nom ou son apparence", en: "judging a machine only by name or appearance" },
    proof: { fr: "rôle observé, service attendu, propriétaire et dépendances", en: "observed role, expected service, owner, and dependencies" }
  },
  {
    slug: "storage-backup-restore-basics",
    categorySlug: "hardware-infrastructure",
    level: "beginner",
    estimatedMinutes: 60,
    title: { fr: "Stockage, sauvegarde et restauration", en: "Storage, backup, and restore" },
    summary: { fr: "Savoir lire ce qui est stocke, sauvegarde et vraiment restaurable.", en: "Learn what is stored, backed up, and truly restorable." },
    subject: { fr: "Stockage veut dire données conservées, sauvegarde veut dire copie de protection, restauration veut dire retour testé", en: "Storage means kept data, backup means protective copy, restore means tested return" },
    action: { fr: "une équipe dit avoir des sauvegardes mais personne n'a teste la restauration", en: "a team says backups exist but nobody tested restoration" },
    risk: { fr: "confondre sauvegarde présente et restauration fiable", en: "confusing existing backup with reliable restoration" },
    proof: { fr: "date du dernier test de restauration, périmètre sauvegarde et temps de reprise", en: "last restore test date, backup scope, and recovery time" }
  },
  {
    slug: "identity-directory-basics",
    categorySlug: "hardware-infrastructure",
    level: "intermediate",
    estimatedMinutes: 65,
    title: { fr: "Identite, annuaire et droits", en: "Identity, directory, and rights" },
    summary: { fr: "Lire comptes, groupes, rôles et droits sans confondre les niveaux.", en: "Read accounts, groups, roles, and rights without mixing levels." },
    subject: { fr: "Identite veut dire compte, annuaire veut dire source centrale, groupe veut dire collection de comptes, droit veut dire action autorisée", en: "Identity means account, directory means central source, group means account collection, right means allowed action" },
    action: { fr: "un utilisateur a accès a un partage qu'il ne devrait pas voir", en: "a user can access a share they should not see" },
    risk: { fr: "retirer des droits au hasard sans comprendre le groupe qui les donne", en: "removing rights randomly without understanding which group grants them" },
    proof: { fr: "chaîne compte -> groupe -> ressource -> permission effective", en: "chain account -> group -> resource -> effective permission" }
  },
  {
    slug: "cloud-exposure-basics",
    categorySlug: "hardware-infrastructure",
    level: "intermediate",
    estimatedMinutes: 65,
    title: { fr: "Exposition cloud et services publics", en: "Cloud exposure and public services" },
    summary: { fr: "Distinguer service interne, service publié et mauvaise exposition.", en: "Separate internal service, published service, and bad exposure." },
    subject: { fr: "Cloud veut dire infrastructure louee ou geree, exposition veut dire accessible depuis un périmètre donne, public veut dire joignable depuis Internet", en: "Cloud means rented or managed infrastructure, exposure means reachable from a given scope, public means reachable from the Internet" },
    action: { fr: "tu inventories les services publics d'une petite application", en: "you inventory public services for a small application" },
    risk: { fr: "penser qu'un service cloud est protege parce qu'il appartient a un fournisseur connu", en: "thinking a cloud service is protected because it belongs to a known provider" },
    proof: { fr: "liste des ports publics, propriétaire, raison métier et règle d'accès", en: "public ports, owner, business reason, and access rule" }
  },
  {
    slug: "password-mfa-hygiene",
    categorySlug: "opsec",
    level: "beginner",
    estimatedMinutes: 45,
    title: { fr: "Mots de passe, gestionnaire et MFA", en: "Passwords, manager, and MFA" },
    summary: { fr: "Construire une hygiène simple et durable pour les comptes.", en: "Build simple and durable account hygiene." },
    subject: { fr: "Un mot de passe unique limite la réutilisation, un gestionnaire stocke, le MFA ajoute une preuve supplémentaire", en: "A unique password limits reuse, a manager stores it, MFA adds another proof" },
    action: { fr: "tu dois sécuriser les comptes essentiels d'un débutant", en: "you must secure a beginner's essential accounts" },
    risk: { fr: "utiliser le même mot de passe partout puis croire que le MFA repare tout", en: "using the same password everywhere and thinking MFA fixes everything" },
    proof: { fr: "comptes prioritaires, mots de passe uniques, MFA actif et méthode de récupération", en: "priority accounts, unique passwords, active MFA, and recovery method" }
  },
  {
    slug: "browser-device-hygiene",
    categorySlug: "opsec",
    level: "beginner",
    estimatedMinutes: 50,
    title: { fr: "Hygiene navigateur et appareil", en: "Browser and device hygiene" },
    summary: { fr: "Limiter les risques quotidiens sans tomber dans la paranoïa.", en: "Reduce everyday risk without paranoia." },
    subject: { fr: "Navigateur, extensions, mises à jour, verrouillage et sauvegarde forment la base d'un poste sain", en: "Browser, extensions, updates, locking, and backup form the base of a healthy device" },
    action: { fr: "tu fais une revue d'un ordinateur personnel avant une formation", en: "you review a personal computer before training" },
    risk: { fr: "installer trop d'extensions ou ignorer les mises à jour parce que tout semble fonctionner", en: "installing too many extensions or ignoring updates because everything seems to work" },
    proof: { fr: "liste d'extensions, état de mise à jour, verrouillage, sauvegarde et comptes connectes", en: "extension list, update state, lock, backup, and signed-in accounts" }
  },
  {
    slug: "phishing-social-engineering-basics",
    categorySlug: "opsec",
    level: "beginner",
    estimatedMinutes: 55,
    title: { fr: "Phishing et manipulation sociale", en: "Phishing and social manipulation" },
    summary: { fr: "Reconnaître les signaux sans accuser trop vite.", en: "Recognize signals without accusing too fast." },
    subject: { fr: "Phishing veut dire tentative de tromperie, urgence veut dire pression, lien veut dire action demandee, contexte veut dire cohérence avec la situation", en: "Phishing means deception attempt, urgency means pressure, link means requested action, context means consistency with the situation" },
    action: { fr: "un message demande une connexion urgente pour éviter une suspension", en: "a message asks for urgent login to avoid suspension" },
    risk: { fr: "cliquer pour vérifier ou transférer le message sans contexte", en: "clicking to verify or forwarding without context" },
    proof: { fr: "expéditeur, domaine, demande, urgence, canal alternatif et signalement", en: "sender, domain, request, urgency, alternate channel, and reporting" }
  },
  {
    slug: "personal-threat-model-basics",
    categorySlug: "opsec",
    level: "intermediate",
    estimatedMinutes: 60,
    title: { fr: "Mini threat model personnel", en: "Personal mini threat model" },
    summary: { fr: "Choisir des protections adaptées a sa vraie situation.", en: "Choose protections adapted to the real situation." },
    subject: { fr: "Threat model veut dire modèle de menace : quoi protéger, contre qui, avec quelles limites", en: "Threat model means threat model: what to protect, against whom, with which limits" },
    action: { fr: "tu veux réduire ton exposition publique sans supprimer toute ta vie numérique", en: "you want to reduce public exposure without deleting your digital life" },
    risk: { fr: "copier les protections d'une autre personne sans avoir les memes menaces", en: "copying someone else's protections without having the same threats" },
    proof: { fr: "actifs personnels, adversaires plausibles, impacts et actions proportionnées", en: "personal assets, plausible adversaries, impacts, and proportionate actions" }
  },
  {
    slug: "tls-browser-security-basics",
    categorySlug: "web-security",
    level: "beginner",
    estimatedMinutes: 55,
    title: { fr: "TLS, cadenas et confiance web", en: "TLS, padlock, and web trust" },
    summary: { fr: "Comprendre ce que le cadenas prouve et ne prouve pas.", en: "Understand what the padlock proves and does not prove." },
    subject: { fr: "TLS chiffre le transport, certificat lie un nom a une clé, navigateur vérifie une chaîne de confiance", en: "TLS encrypts transport, certificate binds a name to a key, browser verifies a trust chain" },
    action: { fr: "un utilisateur voit un cadenas mais doute du site", en: "a user sees a padlock but doubts the site" },
    risk: { fr: "croire que cadenas veut dire site légitime et contenu sans risque", en: "thinking a padlock means legitimate site and risk-free content" },
    proof: { fr: "nom de domaine, certificat, redirection, contenu attendu et contexte", en: "domain name, certificate, redirect, expected content, and context" }
  },
  {
    slug: "access-control-basics",
    categorySlug: "web-security",
    level: "intermediate",
    estimatedMinutes: 70,
    title: { fr: "Controle d'accès web", en: "Web access control" },
    summary: { fr: "Distinguer être connecté, être propriétaire et être autorisé.", en: "Separate being signed in, being owner, and being authorized." },
    subject: { fr: "Controle d'accès veut dire vérifier une action sur une ressource pour un utilisateur donne", en: "Access control means verifying an action on a resource for a given user" },
    action: { fr: "Alice tente d'ouvrir une ressource appartenant à Bob dans un lab autorisé", en: "Alice tries to open Bob's resource inside an authorized lab" },
    risk: { fr: "vérifier seulement la connexion sans vérifier la ressource demandee", en: "checking only sign-in without checking the requested resource" },
    proof: { fr: "utilisateur, ressource, action, propriétaire, rôle et décision serveur", en: "user, resource, action, owner, role, and server decision" }
  },
  {
    slug: "api-security-basics",
    categorySlug: "web-security",
    level: "intermediate",
    estimatedMinutes: 70,
    title: { fr: "Bases de sécurité API", en: "API security basics" },
    summary: { fr: "Lire une API comme un contrat entre client et serveur.", en: "Read an API as a contract between client and server." },
    subject: { fr: "API veut dire interface, endpoint veut dire point d'entrée, schéma veut dire format attendu, token veut dire preuve d'accès", en: "API means interface, endpoint means entry point, schema means expected format, token means access proof" },
    action: { fr: "une application mobile envoie des données a une API", en: "a mobile app sends data to an API" },
    risk: { fr: "faire confiance au client parce qu'il est officiel", en: "trusting the client because it is official" },
    proof: { fr: "schéma valide, authentification, autorisation, limites et journal serveur", en: "valid schema, authentication, authorization, limits, and server log" }
  },
  {
    slug: "web-logging-error-basics",
    categorySlug: "web-security",
    level: "beginner",
    estimatedMinutes: 50,
    title: { fr: "Erreurs web et journaux utiles", en: "Web errors and useful logs" },
    summary: { fr: "Savoir lire une erreur sans exposer trop d'information.", en: "Read an error without exposing too much information." },
    subject: { fr: "Erreur veut dire résultat inattendu, journal veut dire trace interne, message utilisateur doit aider sans révéler de secret", en: "Error means unexpected result, log means internal trace, user message should help without revealing secrets" },
    action: { fr: "une page renvoie 500 pendant qu'un utilisateur se connecté", en: "a page returns 500 while a user signs in" },
    risk: { fr: "afficher la trace technique complète à l'utilisateur", en: "showing the full technical trace to the user" },
    proof: { fr: "code statut, identifiant de correlation, journal serveur et message sobre", en: "status code, correlation id, server log, and sober message" }
  },
  {
    slug: "linux-filesystem-permissions",
    categorySlug: "linux",
    level: "beginner",
    estimatedMinutes: 55,
    title: { fr: "Fichiers, dossiers et permissions Linux", en: "Linux files, directories, and permissions" },
    summary: { fr: "Lire les droits sans casser le système.", en: "Read permissions without breaking the system." },
    subject: { fr: "Utilisateur, groupe, autres, lecture, ecriture et exécution forment la base des droits Linux", en: "User, group, others, read, write, and execute form the base of Linux permissions" },
    action: { fr: "tu dois comprendre pourquoi un script ne s'execute pas", en: "you must understand why a script does not execute" },
    risk: { fr: "mettre 777 pour aller vite", en: "using 777 to go faster" },
    proof: { fr: "sortie ls -la, propriétaire, groupe, droits et besoin réel", en: "ls -la output, owner, group, permissions, and real need" }
  },
  {
    slug: "linux-process-service-logs",
    categorySlug: "linux",
    level: "beginner",
    estimatedMinutes: 60,
    title: { fr: "Processus, services et journaux Linux", en: "Linux processes, services, and logs" },
    summary: { fr: "Comprendre ce qui tourne et ce que le système raconte.", en: "Understand what runs and what the system says." },
    subject: { fr: "Processus veut dire programme en cours, service veut dire processus géré, journal veut dire trace d'état ou d'erreur", en: "Process means running program, service means managed process, log means state or error trace" },
    action: { fr: "un service attendu ne repond plus dans un lab", en: "an expected service no longer responds in a lab" },
    risk: { fr: "redemarrer sans lire l'état ni le journal", en: "restarting without reading state or logs" },
    proof: { fr: "état du service, port attendu, journal récent et changement connu", en: "service state, expected port, recent log, and known change" }
  },
  {
    slug: "linux-networking-tools",
    categorySlug: "linux",
    level: "intermediate",
    estimatedMinutes: 65,
    title: { fr: "Commandes réseau Linux utiles", en: "Useful Linux network commands" },
    summary: { fr: "Utiliser les commandes de lecture réseau sans bruit inutile.", en: "Use network reading commands without useless noise." },
    subject: { fr: "ip, ss, ping, dig et curl aident à lire adresse, ports, résolution et service", en: "ip, ss, ping, dig, and curl help read address, ports, resolution, and service" },
    action: { fr: "tu dois vérifier pourquoi un serveur local ne repond pas", en: "you must verify why a local server does not respond" },
    risk: { fr: "lancer des tests actifs trop larges au lieu de lire l'état local", en: "running overly broad active tests instead of reading local state" },
    proof: { fr: "interface, route, port en écoute, résolution et réponse applicative", en: "interface, route, listening port, resolution, and application response" }
  },
  {
    slug: "linux-updates-backups-basics",
    categorySlug: "linux",
    level: "beginner",
    estimatedMinutes: 55,
    title: { fr: "Mises à jour et sauvegardes Linux", en: "Linux updates and backups" },
    summary: { fr: "Gerer le changement sans perdre l'état du système.", en: "Manage change without losing system state." },
    subject: { fr: "Mise à jour veut dire changement logiciel, sauvegarde veut dire retour possible, rollback veut dire plan de retour arrière", en: "Update means software change, backup means possible return, rollback means backout plan" },
    action: { fr: "tu prepares une mise à jour d'un petit service", en: "you prepare an update for a small service" },
    risk: { fr: "mettre à jour sans savoir restaurer", en: "updating without knowing how to restore" },
    proof: { fr: "état initial, sauvegarde, commande prévue, test après changement et rollback", en: "initial state, backup, planned command, post-change test, and rollback" }
  },
  {
    slug: "symmetric-asymmetric-encryption",
    categorySlug: "cryptography",
    level: "beginner",
    estimatedMinutes: 60,
    title: { fr: "Chiffrement symétrique et asymétrique", en: "Symmetric and asymmetric encryption" },
    summary: { fr: "Comprendre les deux grandes familles de chiffrement.", en: "Understand the two major encryption families." },
    subject: { fr: "Symétrique veut dire même clé pour chiffrer et déchiffrer, asymétrique veut dire paire publique/privée", en: "Symmetric means same key to encrypt and decrypt, asymmetric means public/private pair" },
    action: { fr: "tu expliques comment protéger un message et partager une clé", en: "you explain how to protect a message and share a key" },
    risk: { fr: "confondre confidentialité, authenticité et intégrité", en: "confusing confidentiality, authenticity, and integrity" },
    proof: { fr: "objectif de sécurité, type de clé, propriétaire de la clé et limite du modèle", en: "security goal, key type, key owner, and model limit" }
  },
  {
    slug: "pki-certificate-basics",
    categorySlug: "cryptography",
    level: "intermediate",
    estimatedMinutes: 65,
    title: { fr: "Certificats, PKI et confiance", en: "Certificates, PKI, and trust" },
    summary: { fr: "Lire une chaîne de certificats sans magie.", en: "Read a certificate chain without magic." },
    subject: { fr: "Certificat lie une identité a une clé, autorite signe, chaîne relie le certificat a une racine de confiance", en: "Certificate binds identity to key, authority signs, chain links certificate to a trusted root" },
    action: { fr: "un navigateur signale un certificat invalide", en: "a browser reports an invalid certificate" },
    risk: { fr: "accepter une alerte certificat pour gagner du temps", en: "accepting a certificate warning to save time" },
    proof: { fr: "nom, dates, émetteur, chaîne, usage et contexte du service", en: "name, dates, issuer, chain, usage, and service context" }
  },
  {
    slug: "signatures-integrity-basics",
    categorySlug: "cryptography",
    level: "beginner",
    estimatedMinutes: 55,
    title: { fr: "Signatures et intégrité", en: "Signatures and integrity" },
    summary: { fr: "Verifier qu'un contenu n'a pas ete modifié et vient de la bonne source.", en: "Verify content was not modified and comes from the right source." },
    subject: { fr: "Intégrité veut dire non modification, signature veut dire preuve liée à une clé privée, vérification utilise la clé publique", en: "Integrity means not modified, signature means proof linked to a private key, verification uses the public key" },
    action: { fr: "tu télécharges un outil de lab et veux vérifier sa provenance", en: "you download a lab tool and want to verify origin" },
    risk: { fr: "vérifier seulement que le fichier se lance", en: "checking only that the file runs" },
    proof: { fr: "hash attendu, signature valide, source officielle et date", en: "expected hash, valid signature, official source, and date" }
  },
  {
    slug: "key-management-basics",
    categorySlug: "cryptography",
    level: "intermediate",
    estimatedMinutes: 65,
    title: { fr: "Gestion des clés", en: "Key management" },
    summary: { fr: "Comprendre création, stockage, rotation et révocation.", en: "Understand creation, storage, rotation, and revocation." },
    subject: { fr: "Clé crée un pouvoir, stockage protege ce pouvoir, rotation limite la durée, révocation retire la confiance", en: "A key creates power, storage protects that power, rotation limits duration, revocation removes trust" },
    action: { fr: "une équipe trouve une clé ancienne dans un depot prive", en: "a team finds an old key in a private repository" },
    risk: { fr: "supprimer la clé sans comprendre où elle est utilisee", en: "deleting the key without understanding where it is used" },
    proof: { fr: "usage de la clé, date, exposition, rotation, révocation et impact", en: "key usage, date, exposure, rotation, revocation, and impact" }
  },
  {
    slug: "evidence-preservation-basics",
    categorySlug: "forensics",
    level: "beginner",
    estimatedMinutes: 55,
    title: { fr: "Préserver une preuve numérique", en: "Preserving digital evidence" },
    summary: { fr: "Éviter de détruire l'information que l'on veut comprendre.", en: "Avoid destroying the information you want to understand." },
    subject: { fr: "Preuve veut dire élément observable, préservation veut dire limiter les modifications, chaîne veut dire historique de manipulation", en: "Evidence means observable element, preservation means limiting changes, chain means handling history" },
    action: { fr: "tu découvres un poste suspect dans un exercice de lab", en: "you discover a suspicious host in a lab exercise" },
    risk: { fr: "ouvrir partout et modifier les dates sans le savoir", en: "opening everything and unknowingly modifying timestamps" },
    proof: { fr: "heure, source, action réalisée, copie et personne responsable", en: "time, source, performed action, copy, and responsible person" }
  },
  {
    slug: "system-artifacts-basics",
    categorySlug: "forensics",
    level: "beginner",
    estimatedMinutes: 60,
    title: { fr: "Artefacts système essentiels", en: "Essential system artifacts" },
    summary: { fr: "Savoir quelles traces chercher au debut.", en: "Know which traces to look for first." },
    subject: { fr: "Artefact peut être journal, fichier, compte, processus, connexion, tâche planifiée ou historique", en: "Artifact can be log, file, account, process, connection, scheduled task, or history" },
    action: { fr: "tu dois faire une première lecture d'un système de lab", en: "you must do a first reading of a lab system" },
    risk: { fr: "chercher une trace spectaculaire avant les traces simples", en: "searching for spectacular traces before simple traces" },
    proof: { fr: "liste d'artefacts, emplacement, heure, signification et limite", en: "artifact list, location, time, meaning, and limit" }
  },
  {
    slug: "log-correlation-basics",
    categorySlug: "forensics",
    level: "intermediate",
    estimatedMinutes: 70,
    title: { fr: "Corrélation de journaux", en: "Log correlation" },
    summary: { fr: "Relier plusieurs traces sans inventer l'histoire.", en: "Connect several traces without inventing the story." },
    subject: { fr: "Corrélation veut dire relier des événements par heure, compte, machine, source ou action", en: "Correlation means connecting events by time, account, machine, source, or action" },
    action: { fr: "trois journaux racontent chacun une partie d'un incident", en: "three logs each tell part of an incident" },
    risk: { fr: "aligner les événements sans vérifier fuseau horaire et horloge", en: "aligning events without checking time zone and clock" },
    proof: { fr: "horodatage normalisé, source, événement, confiance et question ouverte", en: "normalized timestamp, source, event, confidence, and open question" }
  },
  {
    slug: "forensic-reporting-basics",
    categorySlug: "forensics",
    level: "intermediate",
    estimatedMinutes: 60,
    title: { fr: "Rapport forensic lisible", en: "Readable forensic report" },
    summary: { fr: "Transformer une analyse en récit factuel utile.", en: "Turn analysis into a useful factual narrative." },
    subject: { fr: "Rapport veut dire transmission, fait veut dire observation, hypothèse veut dire interprétation, recommandation veut dire prochaine action", en: "Report means transmission, fact means observation, hypothesis means interpretation, recommendation means next action" },
    action: { fr: "tu dois expliquer une chronologie a une personne non technique", en: "you must explain a timeline to a non-technical person" },
    risk: { fr: "mélanger certitude, soupçon et conseil dans la même phrase", en: "mixing certainty, suspicion, and advice in one sentence" },
    proof: { fr: "faits séparés des hypothèses, niveau de confiance et action conseillee", en: "facts separated from hypotheses, confidence level, and advised action" }
  },
  {
    slug: "security-logging-basics",
    categorySlug: "blue-team",
    level: "beginner",
    estimatedMinutes: 55,
    title: { fr: "Journaux de sécurité utiles", en: "Useful security logs" },
    summary: { fr: "Comprendre ce qu'il faut journaliser et pourquoi.", en: "Understand what to log and why." },
    subject: { fr: "Journal utile contient qui, quoi, quand, où, résultat et contexte", en: "A useful log contains who, what, when, where, result, and context" },
    action: { fr: "tu dois choisir les journaux minimum pour une petite application", en: "you must choose minimum logs for a small application" },
    risk: { fr: "journaliser trop peu ou stocker des secrets dans les journaux", en: "logging too little or storing secrets in logs" },
    proof: { fr: "événement, identifiant, horodatage, résultat, correlation et absence de secret", en: "event, identifier, timestamp, result, correlation, and no secret" }
  },
  {
    slug: "siem-dashboard-basics",
    categorySlug: "blue-team",
    level: "intermediate",
    estimatedMinutes: 65,
    title: { fr: "SIEM et tableaux de bord", en: "SIEM and dashboards" },
    summary: { fr: "Lire un tableau de bord comme une aide à la décision.", en: "Read a dashboard as decision support." },
    subject: { fr: "SIEM centralise des signaux, tableau de bord résume, requête cherche, alerte demande qualification", en: "SIEM centralizes signals, dashboard summarizes, query searches, alert requires qualification" },
    action: { fr: "un tableau affiche beaucoup d'alertes mais peu de contexte", en: "a dashboard shows many alerts but little context" },
    risk: { fr: "croire que plus d'alertes veut dire meilleure détection", en: "thinking more alerts means better detection" },
    proof: { fr: "source du signal, volume, tendance, exemple, faux positifs et décision", en: "signal source, volume, trend, example, false positives, and decision" }
  },
  {
    slug: "incident-response-first-hour",
    categorySlug: "blue-team",
    level: "beginner",
    estimatedMinutes: 60,
    title: { fr: "Premiere heure de réponse a incident", en: "First hour of incident response" },
    summary: { fr: "Savoir quoi faire sans empirer la situation.", en: "Know what to do without making the situation worse." },
    subject: { fr: "Incident veut dire événement avec impact potentiel, triage veut dire prioriser, confinement veut dire limiter l'impact", en: "Incident means event with possible impact, triage means prioritizing, containment means limiting impact" },
    action: { fr: "une alerte crédible arrive sur un poste important", en: "a credible alert arrives on an important workstation" },
    risk: { fr: "éteindre ou nettoyer trop vite sans preuve ni coordination", en: "shutting down or cleaning too fast without evidence or coordination" },
    proof: { fr: "chronologie initiale, actifs touchés, impact, décision et responsable", en: "initial timeline, affected assets, impact, decision, and owner" }
  },
  {
    slug: "detection-rule-lifecycle",
    categorySlug: "blue-team",
    level: "intermediate",
    estimatedMinutes: 70,
    title: { fr: "Cycle de vie d'une règle de détection", en: "Detection rule lifecycle" },
    summary: { fr: "Créer, tester, ajuster et documenter une détection.", en: "Create, test, tune, and document a detection." },
    subject: { fr: "Détection veut dire signal utile, règle veut dire condition, test veut dire vérification, tuning veut dire réduction du bruit", en: "Detection means useful signal, rule means condition, test means verification, tuning means noise reduction" },
    action: { fr: "une nouvelle règle produit trop de faux positifs", en: "a new rule produces too many false positives" },
    risk: { fr: "désactiver la règle sans apprendre pourquoi elle bruite", en: "disabling the rule without learning why it is noisy" },
    proof: { fr: "objectif, logique, exemples vrais/faux, seuil, exception et revue", en: "objective, logic, true/false examples, threshold, exception, and review" }
  },
  {
    slug: "rules-of-engagement-basics",
    categorySlug: "ethical-red-team",
    level: "beginner",
    estimatedMinutes: 55,
    title: { fr: "Règles d'engagement et autorisation", en: "Rules of engagement and authorization" },
    summary: { fr: "Comprendre les limites avant toute pratique offensive.", en: "Understand limits before any offensive practice." },
    subject: { fr: "Règles d'engagement définissent cibles, dates, actions autorisées, interdits, contacts et arrêt", en: "Rules of engagement define targets, dates, allowed actions, forbidden actions, contacts, and stop" },
    action: { fr: "tu prepares un exercice dans un lab fourni", en: "you prepare an exercise in a provided lab" },
    risk: { fr: "tester une cible proche mais hors périmètre", en: "testing a nearby but out-of-scope target" },
    proof: { fr: "périmètre ecrit, autorisation, limites, contact et règle d'arrêt", en: "written scope, authorization, limits, contact, and stop rule" }
  },
  {
    slug: "authorized-recon-method",
    categorySlug: "ethical-red-team",
    level: "intermediate",
    isPremium: true,
    estimatedMinutes: 70,
    title: { fr: "Reconnaissance autorisée et inventaire", en: "Authorized reconnaissance and inventory" },
    summary: { fr: "Observer un périmètre autorisé sans dépasser le cadre.", en: "Observe an authorized scope without exceeding it." },
    subject: { fr: "Reconnaissance veut dire collecte d'informations dans un cadre autorisé, inventaire veut dire liste vérifiable", en: "Reconnaissance means information collection in an authorized scope, inventory means verifiable list" },
    action: { fr: "tu dois inventorier un lab sans tester hors scope", en: "you must inventory a lab without testing out of scope" },
    risk: { fr: "confondre observation autorisée et curiosité sans limite", en: "confusing authorized observation with unlimited curiosity" },
    proof: { fr: "source, cible autorisée, observation, limite et prochaine validation permise", en: "source, authorized target, observation, limit, and next allowed validation" }
  },
  {
    slug: "responsible-validation-basics",
    categorySlug: "ethical-red-team",
    level: "intermediate",
    isPremium: true,
    estimatedMinutes: 75,
    title: { fr: "Validation responsable d'un risque", en: "Responsible risk validation" },
    summary: { fr: "Prouver assez pour corriger, pas plus.", en: "Prove enough to fix, not more." },
    subject: { fr: "Validation veut dire confirmer un risque dans la limite autorisée, preuve minimale veut dire montrer sans exposer", en: "Validation means confirming risk within authorized limits, minimal evidence means showing without exposing" },
    action: { fr: "une observation de lab indique un accès trop large", en: "a lab observation suggests overly broad access" },
    risk: { fr: "chercher une preuve spectaculaire au lieu d'une preuve suffisante", en: "seeking spectacular proof instead of sufficient proof" },
    proof: { fr: "impact, étapes limitées, preuve minimale, recommandation et vérification", en: "impact, limited steps, minimal evidence, recommendation, and verification" }
  },
  {
    slug: "ctf-methodology-basics",
    categorySlug: "ctf-labs",
    level: "beginner",
    estimatedMinutes: 55,
    title: { fr: "Méthode CTF débutant", en: "Beginner CTF method" },
    summary: { fr: "Résoudre un lab sans partir dans tous les sens.", en: "Solve a lab without scattering." },
    subject: { fr: "CTF veut dire défi isolé, indice veut dire signal, piste veut dire hypothèse, writeup veut dire retour d'apprentissage", en: "CTF means isolated challenge, clue means signal, path means hypothesis, writeup means learning review" },
    action: { fr: "tu ouvres un défi inconnu et dois organiser ton approche", en: "you open an unknown challenge and must organize your approach" },
    risk: { fr: "copier une solution sans comprendre la piste", en: "copying a solution without understanding the path" },
    proof: { fr: "objectif, observations, hypothèses, essais rates, étape qui débloque", en: "goal, observations, hypotheses, failed attempts, unlocking step" }
  },
  {
    slug: "web-lab-workflow",
    categorySlug: "ctf-labs",
    level: "beginner",
    estimatedMinutes: 60,
    title: { fr: "Workflow de lab web autorisé", en: "Authorized web lab workflow" },
    summary: { fr: "Explorer une application de lab proprement et sans bruit inutile.", en: "Explore a lab application cleanly and without useless noise." },
    subject: { fr: "Workflow veut dire ordre de travail, observation veut dire lecture, validation veut dire test limite dans le lab", en: "Workflow means work order, observation means reading, validation means limited test in the lab" },
    action: { fr: "tu dois comprendre une petite application volontairement vulnérable en local", en: "you must understand a small intentionally vulnerable local app" },
    risk: { fr: "tester au hasard avant de lire pages, routes et formulaires", en: "testing randomly before reading pages, routes, and forms" },
    proof: { fr: "carte des pages, formulaires, rôles, données, hypothèses et tests autorisés", en: "map of pages, forms, roles, data, hypotheses, and authorized tests" }
  },
  {
    slug: "writeup-retro-basics",
    categorySlug: "ctf-labs",
    level: "beginner",
    estimatedMinutes: 45,
    title: { fr: "Writeup et rétrospective", en: "Writeup and retrospective" },
    summary: { fr: "Transformer un exercice terminé en compétence durable.", en: "Turn a finished exercise into durable skill." },
    subject: { fr: "Writeup raconte le chemin, rétrospective explique ce qui a bloqué, leçon transforme l'essai en méthode", en: "Writeup tells the path, retrospective explains blockers, lesson turns the attempt into method" },
    action: { fr: "tu viens de finir un lab mais tes notes sont brouillonnes", en: "you just finished a lab but your notes are messy" },
    risk: { fr: "ne garder que le résultat final et perdre le raisonnement", en: "keeping only the final result and losing reasoning" },
    proof: { fr: "chronologie, décisions, erreurs, preuve finale et leçon réutilisable", en: "timeline, decisions, mistakes, final proof, and reusable lesson" }
  }
];

courses.push(...foundationCourseInputs.map(buildFoundationCourse), ...quickFoundationInputs.map(buildQuickFoundationCourse));

type CourseEnhancement = {
  sections: Record<Locale, { title: string; body: string }[]>;
  exercises: Record<Locale, { title: string; body: string; premium?: boolean; solution?: string }[]>;
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
        { question: "Le navigateur bloqué un champ vide, mais une requête directe l'envoie quand même. Où doit se trouver la protection décisive ?", options: ["Côté serveur", "Uniquement dans le HTML", "Dans la couleur du bouton"], correctOption: 0 },
        { question: "Un utilisateur ajoute rôle=admin dans la soumission. Quelle réponse est saine ?", options: ["Ignorer ou rejeter ce champ non autorisé", "Créer un compte admin", "Masquer l'erreur sans journal"], correctOption: 0 },
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
        { title: "Mise en situation", body: "Un utilisateur standard modifié l'URL /users/12 en /users/13 et voit un autre profil. Le mot de passe n'est pas en cause : l'utilisateur est authentifié, mais l'autorisation de l'action n'est pas correctement vérifiée." }
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

const exerciseSolutions: Record<string, Record<Locale, string[]>> = {
  "tcpip-basics": {
    fr: [
      "Correction guidée : 1. Vérifie que 192.168.10.25/24 est cohérent avec le réseau local 192.168.10.0. 2. Vérifie que la passerelle 192.168.10.1 est dans le même réseau et répond. 3. Vérifie la résolution ou l'adresse cible 192.168.20.10. 4. Teste l'accès TCP 443 sans conclure trop vite si ça échoue. 5. Compare avec un autre poste ou un journal réseau. Conclusion : tu peux distinguer problème local, routage, filtrage ou service indisponible, mais pas identifier la cause exacte sans preuve supplémentaire.",
      "Correction guidée : IP = adresse d'une interface, exemple 192.168.10.25. Masque = découpe réseau/hôte, exemple /24. Passerelle = sortie vers un autre réseau, exemple 192.168.10.1. Port = porte logique d'un service, exemple 443 pour HTTPS. Protocole = règle d'échange, exemple TCP. Service = application attendue derrière un port, exemple intranet web."
    ],
    en: [
      "Guided correction: 1. Check that 192.168.10.25/24 fits local network 192.168.10.0. 2. Check that gateway 192.168.10.1 is on the same network and responds. 3. Verify target 192.168.20.10. 4. Test TCP 443 without over-concluding if it fails. 5. Compare with another host or network logs. Conclusion: you can separate local issue, routing, filtering, or unavailable service, but not prove root cause without more evidence.",
      "Guided correction: IP = interface address, example 192.168.10.25. Mask = network/host split, example /24. Gateway = exit to another network, example 192.168.10.1. Port = logical service door, example 443 for HTTPS. Protocol = exchange rules, example TCP. Service = expected application behind a port, example intranet web."
    ]
  },
  "local-lab-vm-setup": {
    fr: [
      "Correction guidée : indique deux VM, leur rôle, le réseau isolé, les actions autorisées, les actions interdites, le snapshot initial, la commande ou procédure de reset, et la règle d'arrêt. Une bonne fiche permet à quelqu'un d'autre de reproduire le lab sans deviner.",
      "Correction guidée : coupe d'abord la communication non prévue, identifie la route ou l'interface responsable, vérifie les règles réseau, note l'heure et l'impact, puis modifié le lab : réseau dédié, snapshot propre, règle d'arrêt et vérification avant chaque exercice."
    ],
    en: [
      "Guided correction: list two VMs, their role, isolated network, allowed actions, forbidden actions, initial snapshot, reset command or procedure, and stop rule. A good sheet lets someone else reproduce the lab without guessing.",
      "Guided correction: first cut the unexpected communication, identify the route or interface involved, check network rules, record time and impact, then adjust the lab: dedicated network, clean snapshot, stop rule, and pre-exercise verification."
    ]
  },
  "network-map-first-steps": {
    fr: [
      "Correction guidée : ta carte doit montrer les zones, les 5 machines, le rôle supposé de chacune, les flux attendus, les flux douteux, une prochaine vérification et un niveau de confiance. La meilleure carte n'est pas la plus belle : c'est celle qui aide à décider.",
      "Correction guidée : pour chaque flux, écris une phrase complète : source, destination, protocole/port, raison probable, preuve disponible, vérification suivante. Exemple : 'poste invité vers DNS en UDP/53, résolution probable, à confirmer par journaux DNS'."
    ],
    en: [
      "Guided correction: your map should show zones, the 5 machines, expected role for each, expected flows, doubtful flows, next verification, and confidence level. The best map is not the prettiest: it helps decide.",
      "Guided correction: for each flow, write a complete sentence: source, destination, protocol/port, likely reason, available evidence, next check. Example: 'guest workstation to DNS over UDP/53, likely resolution, confirm with DNS logs'."
    ]
  },
  "http-basics": {
    fr: [
      "Correction guidée : une bonne réponse sépare méthode, chemin, statut, cookie, redirection et conclusion. Exemple : POST /login -> 302 -> Set-Cookie -> /dashboard. Observation : redirection et session créées. Hypothèse prudente : connexion réussie, à confirmer avec la page cible et les journaux.",
      "Correction guidée : méthode = intention HTTP, chemin = ressource, statut = résultat, en-tête = contexte, cookie = état côté client, corps = données envoyées. Pour chaque définition, donne un usage défensif : diagnostic, contrôle de session, erreur, cache ou validation."
    ],
    en: [
      "Guided correction: a good answer separates method, path, status, cookie, redirect, and conclusion. Example: POST /login -> 302 -> Set-Cookie -> /dashboard. Observation: redirect and session created. Careful hypothesis: sign-in succeeded, confirm with target page and logs.",
      "Guided correction: method = HTTP intent, path = resource, status = result, header = context, cookie = client-side state, body = sent data. For each definition, give a defensive use: diagnosis, session control, error handling, cache, or validation."
    ]
  },
  "web-form-basics": {
    fr: [
      "Correction guidée : le contrat serveur doit refuser les champs inconnus, vérifier types, longueurs, formats, droits et intention. Pour l'inscription : email valide, mot de passe assez robuste, nom borné, aucun rôle fourni par le client, erreurs claires et journalisation sobre.",
      "Correction guidée : email trop long -> rejet avec limite claire. Nom vide -> rejet côté serveur même si le navigateur l'avait bloqué. rôle=admin -> ignoré ou rejeté car non autorisé. Dans les trois cas, pas de donnée sensible dans le message d'erreur."
    ],
    en: [
      "Guided correction: the server contract should reject unknown fields and verify types, lengths, formats, rights, and intent. For registration: valid email, sufficiently robust password, bounded name, no role accepted from client, clear errors, and sober logging.",
      "Guided correction: very long email -> reject with clear limit. Empty name -> reject server-side even if browser should block it. role=admin -> ignore or reject as unauthorized. In all three cases, avoid sensitive data in the error message."
    ]
  },
  "web-auth-foundations": {
    fr: [
      "Correction guidée : décris un utilisateur authentifié qui demande une ressource appartenant à quelqu'un d'autre. Le serveur doit vérifier propriétaire, rôle, action demandée, état de session et journaliser l'échec sans exposer la ressource.",
      "Correction guidée : connexion = authentification et limitation des essais. Changement d'email = session récente, MFA ou confirmation. Suppression = autorisation forte et confirmation. Accès admin = rôle serveur vérifié, jamais un champ envoyé par le client."
    ],
    en: [
      "Guided correction: describe an authenticated user requesting someone else's resource. The server should check owner, role, requested action, session state, and log the failure without exposing the resource.",
      "Guided correction: sign-in = authentication and attempt limiting. Email change = recent session, MFA or confirmation. Deletion = strong authorization and confirmation. Admin access = server-verified role, never a client-sent field."
    ]
  },
  "linux-shell-basics": {
    fr: [
      "Correction guidée : commence par pwd, ls -la, file, stat, puis lis sans modifier avec less/head/tail. Ensuite seulement, filtre les journaux utiles. La conclusion doit dire ce qui est observé, ce qui est hypothèse et ce qu'il faut vérifier.",
      "Correction guidée : pour chaque droit, lis propriétaire/groupe/autres. Indique qui peut lire, écrire, exécuter. Le risque principal apparaît quand un fichier sensible est modifiable par un groupe trop large ou par 'others'."
    ],
    en: [
      "Guided correction: start with pwd, ls -la, file, stat, then read without modifying using less/head/tail. Only then filter useful logs. The conclusion should state what is observed, what is hypothesis, and what must be verified.",
      "Guided correction: for each permission set, read owner/group/others. State who can read, write, execute. The main risk appears when a sensitive file is writable by a broad group or by 'others'."
    ]
  },
  "linux-service-hardening": {
    fr: [
      "Correction guidée : note l'état initial, l'utilisateur actuel, les ports exposés, les fichiers nécessaires, les droits à retirer, le test après changement et le rollback. Ne retire pas tout d'un coup : durcis, testes, documentes.",
      "Correction guidée : classe chaque élément. Port attendu : nécessaire. Fichier lu par le service : nécessaire si justifié. Écriture hors dossier prévu : à retirer. Journaux : nécessaires. Dépendance inconnue : à vérifier avant changement."
    ],
    en: [
      "Guided correction: record initial state, current user, exposed ports, required files, rights to remove, post-change test, and rollback. Do not remove everything at once: harden, test, document.",
      "Guided correction: classify each item. Expected port: necessary. File read by service: necessary if justified. Write access outside expected directory: remove. Logs: necessary. Unknown dependency: verify before change."
    ]
  },
  "ctf-evidence-notes": {
    fr: [
      "Correction guidée : une bonne note contient contexte, objectif, hypothèse, action, observation, conclusion et prochaine étape. La capture ou sortie doit être accompagnée de l'heure, de la machine, de l'état du lab et de ton interprétation.",
      "Correction guidée : repars de la commande finale et reconstruis les décisions : pourquoi cette cible, quelle hypothèse, quel essai a échoué, quelle observation a fait avancer, quelle preuve confirme le résultat."
    ],
    en: [
      "Guided correction: a good note contains context, goal, hypothesis, action, observation, conclusion, and next step. Screenshot or output should include time, machine, lab state, and your interpretation.",
      "Guided correction: start from the final command and reconstruct decisions: why this target, which hypothesis, which attempt failed, which observation moved you forward, which evidence confirms the result."
    ]
  },
  "infrastructure-asset-baseline": {
    fr: [
      "Correction guidée : pour chaque actif, indique rôle, propriétaire, dépendances, exposition, sauvegarde, priorité et inconnue dangereuse. Une fiche utile explique pourquoi l'actif compte, pas seulement son nom.",
      "Correction guidée : choisis l'actif avec le meilleur mélange d'exposition, impact et incertitude. Exemple : une base peu documentée sans restauration testée peut passer avant un poste moins exposé."
    ],
    en: [
      "Guided correction: for each asset, state role, owner, dependencies, exposure, backup, priority, and dangerous unknown. A useful sheet explains why the asset matters, not only its name.",
      "Guided correction: choose the asset with the strongest mix of exposure, impact, and uncertainty. Example: a poorly documented database without tested restore can come before a less exposed workstation."
    ]
  },
  "opsec-public-footprint-review": {
    fr: [
      "Correction guidée : note les 10 informations, puis combine-les. Une ville + horaires + employeur + outil interne peut devenir sensible même si chaque détail semble banal. La réponse attendue classe exposition, utilité pour un tiers et réduction.",
      "Correction guidée : associe une action à chaque risque : supprimer si inutile, généraliser si trop précis, séparer les identités si corrélable, limiter l'audience si personnel, surveiller si nécessaire."
    ],
    en: [
      "Guided correction: record the 10 pieces of information, then combine them. City + schedule + employer + internal tool can become sensitive even if each detail looks ordinary. Expected answer classifies exposure, third-party usefulness, and reduction.",
      "Guided correction: attach one action to each risk: remove if useless, generalize if too precise, separate identities if correlatable, limit audience if personal, monitor if necessary."
    ]
  },
  "crypto-hashing-and-passwords": {
    fr: [
      "Correction guidée : mot de passe clair = critique, correction immédiate. Hash rapide sans sel = comparaisons et attaques rapides, correction avec sel unique et fonction adaptée. Fonction lente avec sel = meilleure base, à documenter avec paramètres.",
      "Correction guidée : hash = empreinte non réversible. Chiffrement = coffre ouvrable avec clé. Sel = valeur unique ajoutée pour casser les comparaisons. Fonction lente = ralentit les essais massifs. L'analogie doit préciser ses limites."
    ],
    en: [
      "Guided correction: clear password = critical, immediate correction. Fast hash without salt = comparisons and fast attacks, fix with unique salt and suitable function. Slow function with salt = better baseline, document parameters.",
      "Guided correction: hash = non-reversible fingerprint. Encryption = locked box opened with a key. Salt = unique value added to break comparisons. Slow function = slows mass attempts. The analogy should state its limits."
    ]
  },
  "forensics-timeline-first-pass": {
    fr: [
      "Correction guidée : chaque ligne doit contenir heure, source, fait observé, hypothèse, confiance et question ouverte. Si le fuseau change la lecture, note les deux interprétations avant de conclure.",
      "Correction guidée : transforme 'l'attaquant a exécuté X' en 'le journal Y indique l'événement X à telle heure ; hypothèse : exécution par tel compte ; confiance : moyenne ; vérification : corréler avec Z'."
    ],
    en: [
      "Guided correction: each line should contain time, source, observed fact, hypothesis, confidence, and open question. If time zone changes interpretation, record both readings before concluding.",
      "Guided correction: turn 'the attacker executed X' into 'log Y shows event X at this time; hypothesis: execution by this account; confidence: medium; verification: correlate with Z'."
    ]
  },
  "blue-team-alert-triage": {
    fr: [
      "Correction guidée : le ticket doit inclure signal, actif, utilisateur, heure, source, contexte récent, hypothèses, preuves disponibles, preuves manquantes, décision et critère de sortie. Sans critère, la surveillance n'a pas de fin.",
      "Correction guidée : faux positif si le contexte explique clairement. Surveillance si l'incertitude reste mais l'impact immédiat est limité. Escalade si preuves, impact ou privilèges justifient une décision rapide."
    ],
    en: [
      "Guided correction: the ticket should include signal, asset, user, time, source, recent context, hypotheses, available evidence, missing evidence, decision, and exit criterion. Without criteria, monitoring has no end.",
      "Guided correction: false positive if context clearly explains it. Monitoring if uncertainty remains but immediate impact is limited. Escalation if evidence, impact, or privileges justify fast decision."
    ]
  },
  "ethical-red-team-scope-and-reporting": {
    fr: [
      "Correction guidée : une fiche solide contient objectifs, cibles autorisées, cibles interdites, dates, contacts, limites techniques, preuves acceptables, règle d'arrêt et livrables. Tout élément hors périmètre doit être clarifié avant action.",
      "Correction guidée : observation -> impact -> preuve minimale -> recommandation -> priorité -> vérification attendue. La preuve doit démontrer le risque sans exposer de secret ni causer de dommage.",
    ],
    en: [
      "Guided correction: a strong sheet contains goals, authorized targets, forbidden targets, dates, contacts, technical limits, acceptable evidence, stop rule, and deliverables. Anything out of scope must be clarified before action.",
      "Guided correction: observation -> impact -> minimal evidence -> recommendation -> priority -> expected verification. Evidence should demonstrate risk without exposing secrets or causing damage."
    ]
  }
};

type BeginnerDeepDive = Record<Locale, { words: string; guided: string; mistake: string; checkpoint: string }>;

const beginnerDeepDives = {
  "tcpip-basics": {
    fr: {
      words: "Mot par mot : IP veut dire adresse d'une interface, comme une etiquette de livraison. Reseau veut dire groupe d'adresses qui peuvent se parler directement. Masque veut dire règle de decoupe entre la partie réseau et la partie machine. Passerelle veut dire sortie vers un autre réseau. Port veut dire porte logique d'un service, pas un cable physique.",
      guided: "Exemple guide : tu vois 192.168.10.25/24 avec une passerelle 192.168.10.1. Tu lis d'abord le /24 : le réseau est 192.168.10.0. Tu compares ensuite la passerelle : elle est dans le même réseau, donc elle peut être jointe directement. Puis tu regardes la cible : 192.168.20.10 n'est pas dans le même réseau, donc le poste devra passer par la passerelle.",
      mistake: "Erreur classique : croire qu'une IP identifie toute la machine ou toute la personne. En réalité, une machine peut avoir plusieurs interfaces, donc plusieurs IP. Autre piège : voir un port 443 et conclure trop vite que tout est sain. 443 suggère HTTPS, mais il faut vérifier le service, le certificat, les journaux et le contexte.",
      checkpoint: "Checkpoint : si tu peux dire en une phrase qui parle à qui, par quel protocole, vers quel port, et pourquoi la passerelle intervient ou non, tu as compris la lecture de base. Si tu bloques, reviens aux cinq mots : IP, masque, réseau, passerelle, port."
    },
    en: {
      words: "Word by word: IP means an interface address, like a delivery label. Network means a group of addresses that can talk directly. Mask means the split rule between the network part and the machine part. Gateway means exit toward another network. Port means a logical service door, not a physical cable.",
      guided: "Guided example: you see 192.168.10.25/24 with gateway 192.168.10.1. First read /24: the network is 192.168.10.0. Then compare the gateway: it is in the same network, so it can be reached directly. Then inspect the target: 192.168.20.10 is not in the same network, so the host will use the gateway.",
      mistake: "Common trap: thinking an IP identifies a whole machine or a person. A machine can have several interfaces, therefore several IPs. Another trap: seeing port 443 and concluding everything is healthy. 443 suggests HTTPS, but you still verify service, certificate, logs, and context.",
      checkpoint: "Checkpoint: if you can say in one sentence who talks to whom, through which protocol, toward which port, and why the gateway is or is not involved, you understand the base reading. If stuck, return to five words: IP, mask, network, gateway, port."
    }
  },
  "local-lab-vm-setup": {
    fr: {
      words: "Mot par mot : lab veut dire environnement d'entraînement. Périmètre veut dire ce qui est autorisé et ce qui ne l'est pas. VM veut dire machine virtuelle, donc ordinateur simulé dans ton ordinateur. Snapshot veut dire point de retour. Isolation veut dire que le lab ne doit pas toucher tes machines ou services personnels.",
      guided: "Exemple guide : avant un exercice, tu écris deux machines autorisées, leur rôle, le réseau utilisé, l'objectif, la règle d'arrêt et la façon de revenir au snapshot. Ce papier simple transforme l'exercice en zone contrôlée : tu sais où tu peux agir, quand t'arrêter, et comment réparer une erreur.",
      mistake: "Erreur classique : installer un outil puis tester au hasard parce que le lab semble local. Un lab local peut quand même communiquer avec Internet ou ton réseau personnel si l'interface est mal choisie. La bonne habitude est de vérifier l'isolation avant l'action, pas après un doute.",
      checkpoint: "Checkpoint : tu dois pouvoir montrer ton lab à quelqu'un et repondre sans hésiter : quelles machines, quelles actions, quelle limite, quel retour arrière. Si une réponse manque, le lab n'est pas encore prêt."
    },
    en: {
      words: "Word by word: lab means training environment. Scope means what is allowed and what is not. VM means virtual machine, a simulated computer inside your computer. Snapshot means return point. Isolation means the lab should not touch your personal machines or services.",
      guided: "Guided example: before an exercise, write the two authorized machines, their role, the network, the goal, the stop rule, and the snapshot return method. This simple sheet turns practice into a controlled zone: you know where to act, when to stop, and how to repair a mistake.",
      mistake: "Common trap: installing a tool and testing randomly because the lab feels local. A local lab can still talk to the Internet or your personal network if the interface is wrong. The good habit is checking isolation before acting, not after doubt appears.",
      checkpoint: "Checkpoint: you should be able to show your lab to someone and answer without hesitation: which machines, which actions, which limit, which rollback. If an answer is missing, the lab is not ready yet."
    }
  },
  "network-map-first-steps": {
    fr: {
      words: "Mot par mot : hôte veut dire machine vue sur le réseau. Flux veut dire communication entre une source et une destination. Service veut dire application joignable, comme DNS ou web. Zone veut dire groupe logique, par exemple postes, serveurs ou invites. Hypothèse veut dire idée plausible mais pas encore prouvée.",
      guided: "Exemple guide : tu observes un poste, un DNS, une passerelle et un serveur web. Tu ne dessines pas seulement des icônes : tu notes poste vers DNS en UDP/53, poste vers web en TCP/443, poste vers passerelle pour sortir. Chaque flèche doit avoir une raison probable et une preuve ou une question.",
      mistake: "Erreur classique : confondre carte et décoration. Une carte utile n'est pas celle qui impressionne, c'est celle qui évite de se tromper. Si tu mets une machine en serveur sans preuve, marque confiance faible. Si tu ne sais pas pourquoi un flux existe, garde-le comme inconnue.",
      checkpoint: "Checkpoint : une bonne carte débutant contient machines, rôles supposés, flux principaux, inconnues et prochaine vérification. Quand tu peux expliquer chaque flèche en une phrase simple, tu progresses vraiment."
    },
    en: {
      words: "Word by word: host means a machine seen on the network. Flow means communication between a source and a destination. Service means reachable application, such as DNS or web. Zone means logical group, such as workstations, servers, or guests. Hypothesis means plausible idea not yet proven.",
      guided: "Guided example: you observe a workstation, DNS, gateway, and web server. You do not only draw icons: record workstation to DNS over UDP/53, workstation to web over TCP/443, workstation to gateway for exit. Every arrow needs a likely reason and evidence or a question.",
      mistake: "Common trap: confusing map with decoration. A useful map is not the one that impresses; it is the one that prevents mistakes. If you mark a machine as server without proof, set confidence low. If you cannot explain a flow, keep it as an unknown.",
      checkpoint: "Checkpoint: a beginner map contains machines, likely roles, main flows, unknowns, and next verification. When you can explain every arrow in a simple sentence, you are truly progressing."
    }
  },
  "http-basics": {
    fr: {
      words: "Mot par mot : client veut dire navigateur ou application qui demande. Serveur veut dire système qui repond. Requête veut dire message envoyé par le client. Réponse veut dire message renvoye par le serveur. Méthode veut dire intention HTTP, comme GET pour lire ou POST pour envoyer. Statut veut dire résultat, comme 200, 302 ou 404.",
      guided: "Exemple guide : tu cliques sur connexion. Le navigateur envoie POST /login avec des champs. Le serveur repond 302 et ajoute un cookie. Le navigateur suit vers /dashboard. Tu lis donc une histoire : envoi d'identifiants, création possible de session, redirection, puis page cible.",
      mistake: "Erreur classique : croire que le navigateur decide de la sécurité. Le navigateur aide, mais le serveur doit vérifier. Un bouton cache, un champ disabled ou une validation HTML ne suffisent jamais. Tout ce qui compte doit être contrôle côté serveur.",
      checkpoint: "Checkpoint : quand tu lis une trace HTTP, sépare méthode, chemin, statut, en-têtes, cookie et corps. Si tu peux raconter le dialogue sans inventer, tu as la base pour comprendre la sécurité web."
    },
    en: {
      words: "Word by word: client means browser or application that asks. Server means system that answers. Request means message sent by the client. Response means message returned by the server. Method means HTTP intent, such as GET to read or POST to send. Status means result, such as 200, 302, or 404.",
      guided: "Guided example: you click sign in. The browser sends POST /login with fields. The server answers 302 and adds a cookie. The browser follows /dashboard. You can read the story: credentials sent, possible session created, redirect, then target page.",
      mistake: "Common trap: thinking the browser decides security. The browser helps, but the server must verify. A hidden button, disabled field, or HTML validation is never enough. Everything that matters must be checked server-side.",
      checkpoint: "Checkpoint: when reading HTTP, separate method, path, status, headers, cookie, and body. If you can tell the dialogue without inventing, you have the base for web security."
    }
  },
  "web-form-basics": {
    fr: {
      words: "Mot par mot : formulaire veut dire zone ou l'utilisateur envoie des données. Champ veut dire une information, comme email. Validation veut dire vérification d'une règle. Type veut dire nature attendue, comme texte ou nombre. Longueur veut dire taille maximale. Contrat serveur veut dire liste de ce que le serveur accepte vraiment.",
      guided: "Exemple guide : un formulaire d'inscription demande email, mot de passe et nom. Le serveur vérifie format email, longueur du nom, robustesse du mot de passe et refuse un champ rôle=admin ajoute à la main. Le formulaire n'est donc pas une confiance : c'est une demande que le serveur doit contrôler.",
      mistake: "Erreur classique : penser que si le champ n'apparait pas à l'écran, il ne peut pas être envoyé. Un utilisateur peut modifier une requête. Le serveur doit ignorer ou refuser les champs inattendus et ne jamais déduire un droit depuis une donnée libre.",
      checkpoint: "Checkpoint : pour chaque champ, demande-toi quoi vérifier, qui a le droit de l'envoyer, quelle limite appliquer et quel message d'erreur afficher. Si tu peux faire cette table, tu sais penser comme un défenseur."
    },
    en: {
      words: "Word by word: form means an area where the user sends data. Field means one piece of information, such as email. Validation means checking a rule. Type means expected nature, such as text or number. Length means maximum size. Server contract means what the server truly accepts.",
      guided: "Guided example: a sign-up form asks for email, password, and name. The server checks email format, name length, password strength, and rejects a manually added role=admin field. The form is not trust: it is a request the server must control.",
      mistake: "Common trap: thinking that if a field is not visible, it cannot be sent. A user can modify a request. The server must ignore or reject unexpected fields and never infer rights from free input.",
      checkpoint: "Checkpoint: for every field, ask what to verify, who may send it, what limit applies, and which error message to show. If you can build that table, you think like a defender."
    }
  },
  "web-auth-foundations": {
    fr: {
      words: "Mot par mot : authentification veut dire prouver qui tu es. Autorisation veut dire vérifier ce que tu as le droit de faire. Session veut dire souvenir temporaire côté application. Cookie de session veut dire preuve stockée côté navigateur. Role veut dire niveau de droit, comme user ou admin.",
      guided: "Exemple guide : Alice se connecté, puis demande /factures/42. Le serveur ne doit pas seulement voir qu'Alice est connectée. Il doit vérifier que la facture 42 appartient à Alice ou que son rôle autorise l'accès. Connexion et autorisation sont deux questions différentes.",
      mistake: "Erreur classique : confondre connecté et autorisé. Un utilisateur connecté n'a pas automatiquement accès à tout. Autre piège : faire confiance a un rôle envoyé par le client. Le rôle fiable vient du serveur, de la base ou d'un jeton vérifie.",
      checkpoint: "Checkpoint : devant chaque action sensible, pose deux questions : qui es-tu, puis as-tu le droit ici et maintenant. Si les deux réponses sont séparées, ton modèle mental est solide."
    },
    en: {
      words: "Word by word: authentication means proving who you are. Authorization means checking what you are allowed to do. Session means temporary application memory. Session cookie means proof stored in the browser. Role means right level, such as user or admin.",
      guided: "Guided example: Alice signs in, then requests /invoices/42. The server must not only see that Alice is signed in. It must check that invoice 42 belongs to Alice or that her role allows access. Sign-in and authorization are two different questions.",
      mistake: "Common trap: confusing signed in and authorized. A signed-in user does not automatically access everything. Another trap: trusting a role sent by the client. A reliable role comes from the server, database, or verified token.",
      checkpoint: "Checkpoint: before every sensitive action, ask two questions: who are you, then are you allowed here and now. If both answers are separate, your mental model is solid."
    }
  },
  "linux-shell-basics": {
    fr: {
      words: "Mot par mot : shell veut dire interface texte pour parler au système. Commande veut dire instruction. Repertoire veut dire dossier. Fichier veut dire données stockées. Droit veut dire qui peut lire, ecrire ou exécuter. Journal veut dire trace d'événements.",
      guided: "Exemple guide : tu arrives dans un dossier inconnu. Tu utilises pwd pour savoir où tu es, ls -la pour voir les fichiers, file pour comprendre leur type, puis less pour lire sans modifier. Tu avances comme un analyste : observer, comprendre, conclure doucement.",
      mistake: "Erreur classique : lancer une commande destructive avant d'avoir observé. En sécurité, lire vaut souvent mieux qu'agir. Évite de supprimer, de déplacer ou de modifier tant que tu ne sais pas ce que représente le fichier et quel impact aurait le changement.",
      checkpoint: "Checkpoint : si tu peux expliquer une ligne ls -la avec propriétaire, groupe, droits et nom du fichier, tu as la base. Si tu peux lire un journal sans le modifier, tu gagnes un vrai reflexe d'analyse."
    },
    en: {
      words: "Word by word: shell means text interface to talk to the system. Command means instruction. Directory means folder. File means stored data. Permission means who can read, write, or execute. Log means event trace.",
      guided: "Guided example: you enter an unknown folder. Use pwd to know where you are, ls -la to see files, file to understand their type, then less to read without modifying. You move like an analyst: observe, understand, conclude carefully.",
      mistake: "Common trap: running a destructive command before observing. In security, reading is often better than acting. Avoid deleting, moving, or modifying until you know what the file represents and what the change would impact.",
      checkpoint: "Checkpoint: if you can explain an ls -la line with owner, group, permissions, and file name, you have the base. If you can read a log without modifying it, you gain a real analysis reflex."
    }
  },
  "ctf-evidence-notes": {
    fr: {
      words: "Mot par mot : note veut dire trace ecrite de ton raisonnement. Preuve veut dire observation vérifiable. Hypothèse veut dire idée à tester. Action veut dire ce que tu fais. Conclusion veut dire ce que tu peux dire après l'observation, sans exagerer.",
      guided: "Exemple guide : tu testes une page de lab. Note l'objectif, l'URL, l'action, le résultat, puis la conclusion. Une bonne note ressemble à : j'ai essayé ceci, j'ai observé cela, donc je pense ceci, et la prochaine vérification est celle-ci.",
      mistake: "Erreur classique : garder seulement la commande finale. Le vrai apprentissage est dans les essais rates, les changements d'hypothèse et les preuves. Sans ces traces, tu ne peux pas expliquer comment tu as progresse.",
      checkpoint: "Checkpoint : une note utile doit permettre de refaire ton chemin le lendemain. Si tu peux reprendre sans mémoire magique, tu as transforme un exercice en compétence."
    },
    en: {
      words: "Word by word: note means written trace of your reasoning. Evidence means verifiable observation. Hypothesis means idea to test. Action means what you do. Conclusion means what you can say after observation, without overstating.",
      guided: "Guided example: you test a lab page. Record goal, URL, action, result, then conclusion. A good note sounds like: I tried this, I observed that, so I think this, and the next verification is this.",
      mistake: "Common trap: keeping only the final command. The real learning is in failed attempts, changed hypotheses, and evidence. Without those traces, you cannot explain how you progressed.",
      checkpoint: "Checkpoint: a useful note lets you replay your path the next day. If you can resume without magic memory, you turned an exercise into skill."
    }
  },
  "infrastructure-asset-baseline": {
    fr: {
      words: "Mot par mot : actif veut dire élément important, comme serveur, base, application ou sauvegarde. Baseline veut dire état de reference. Proprietaire veut dire personne responsable. Exposition veut dire qui peut atteindre l'actif. Criticite veut dire impact si l'actif tombe ou fuit.",
      guided: "Exemple guide : une base de données interne n'est pas seulement un nom. Tu notes son rôle, les applications qui l'utilisent, qui la gère, où elle est exposée, comment elle est sauvegardée et ce qui reste inconnu. La valeur est dans le contexte.",
      mistake: "Erreur classique : faire une liste d'actifs sans priorité. Dix noms ne disent pas quoi protéger d'abord. Un actif peu visible mais sans sauvegarde testée peut être plus urgent qu'un poste connu et bien géré.",
      checkpoint: "Checkpoint : pour chaque actif, tu dois pouvoir repondre : à quoi sert-il, qui en depend, qui y accede, que se passe-t-il s'il tombe, quelle preuve manque. La baseline devient alors utile."
    },
    en: {
      words: "Word by word: asset means important element, such as server, database, application, or backup. Baseline means reference state. Owner means responsible person. Exposure means who can reach the asset. Criticality means impact if the asset fails or leaks.",
      guided: "Guided example: an internal database is not only a name. Record its role, applications that use it, who manages it, where it is exposed, how it is backed up, and what remains unknown. The value is in context.",
      mistake: "Common trap: building an asset list without priority. Ten names do not say what to protect first. A less visible asset without tested backup can be more urgent than a known and well-managed workstation.",
      checkpoint: "Checkpoint: for every asset, you should answer: what it does, who depends on it, who reaches it, what happens if it fails, which proof is missing. Then the baseline becomes useful."
    }
  },
  "opsec-public-footprint-review": {
    fr: {
      words: "Mot par mot : OpSec veut dire sécurité opérationnelle, donc limiter ce que tes habitudes révèlent. Empreinte publique veut dire informations visibles par tous. Corrélation veut dire relier plusieurs petits indices. Réduction veut dire enlever, flouter ou séparer ce qui expose trop.",
      guided: "Exemple guide : une ville seule semble banale, un outil publié semble banal, un horaire semble banal. Ensemble, ville + outil + horaires + employeur peuvent aider quelqu'un à te cibler. L'analyse OpSec regarde les combinaisons, pas seulement les détails isolés.",
      mistake: "Erreur classique : supprimer au hasard ou paniquer. L'objectif n'est pas de disparaitre, mais de choisir ce qui reste public. Une bonne réduction garde ce qui sert ton objectif et retire ce qui donne trop de contexte inutile.",
      checkpoint: "Checkpoint : pour chaque info publique, demande : qui peut la voir, que peut-on deviner avec, quel autre indice la renforce, est-elle nécessaire. Cette grille simple donne un vrai contrôle."
    },
    en: {
      words: "Word by word: OpSec means operational security, limiting what your habits reveal. Public footprint means information visible to everyone. Correlation means connecting several small clues. Reduction means removing, blurring, or separating what exposes too much.",
      guided: "Guided example: a city alone looks ordinary, a published tool looks ordinary, a schedule looks ordinary. Together, city + tool + schedule + employer can help someone target you. OpSec analysis reads combinations, not only isolated details.",
      mistake: "Common trap: deleting randomly or panicking. The goal is not to disappear, but to choose what stays public. Good reduction keeps what serves your goal and removes unnecessary context.",
      checkpoint: "Checkpoint: for every public detail, ask: who can see it, what can be guessed from it, which other clue reinforces it, is it necessary. This simple grid gives real control."
    }
  },
  "crypto-hashing-and-passwords": {
    fr: {
      words: "Mot par mot : hash veut dire empreinte calculée depuis une donnee. Non réversible veut dire qu'on ne doit pas retrouver le texte original depuis l'empreinte. Sel veut dire valeur unique ajoutée pour casser les comparaisons. Fonction lente veut dire calcul volontairement coûteux pour ralentir les essais.",
      guided: "Exemple guide : deux personnes ont le même mot de passe. Sans sel, le hash peut être identique et donc facile a comparer. Avec un sel différent pour chacun, les empreintes changent. Avec une fonction lente adaptée, tester des millions de mots de passe devient beaucoup plus coûteux.",
      mistake: "Erreur classique : confondre hash et chiffrement. Le chiffrement se décrypte avec une clé. Un hash de mot de passe ne doit pas se décrypter. On vérifie un mot de passe en recalculant l'empreinte avec les bons paramètres, pas en récupérant le mot de passe.",
      checkpoint: "Checkpoint : si tu peux expliquer hash, sel et lenteur avec une analogie, puis dire ou l'analogie s'arrete, tu comprends mieux que beaucoup de debutants. Le detail important est la vérification, pas la récupération."
    },
    en: {
      words: "Word by word: hash means fingerprint computed from data. Non-reversible means the original text should not be recovered from the fingerprint. Salt means unique value added to break comparisons. Slow function means intentionally costly computation to slow attempts.",
      guided: "Guided example: two people use the same password. Without salt, the hash can be identical and easy to compare. With a different salt for each, fingerprints change. With a suitable slow function, testing millions of passwords becomes much more expensive.",
      mistake: "Common trap: confusing hash and encryption. Encryption decrypts with a key. A password hash should not decrypt. You verify a password by recomputing the fingerprint with the right parameters, not by recovering the password.",
      checkpoint: "Checkpoint: if you can explain hash, salt, and slowness with an analogy, then say where the analogy stops, you understand more than many beginners. The key detail is verification, not recovery."
    }
  },
  "forensics-timeline-first-pass": {
    fr: {
      words: "Mot par mot : forensic veut dire analyse de traces après un événement. Chronologie veut dire ordre des faits dans le temps. Artefact veut dire trace utile, comme journal, fichier, compte ou connexion. Hypothèse veut dire interprétation. Confiance veut dire force de la preuve.",
      guided: "Exemple guide : tu vois une connexion à 10:03, un fichier modifié à 10:05, puis une alerte à 10:08. Tu ne dis pas tout de suite 'attaque terminee'. Tu écris les faits, la source de chaque fait, le fuseau horaire, puis ce que tu peux supposer prudemment.",
      mistake: "Erreur classique : raconter une histoire trop vite. Une chronologie n'est pas un roman, c'est une table de faits. Si l'heure vient de sources différentes ou de fuseaux différents, la conclusion doit rester prudente jusqu'a correlation.",
      checkpoint: "Checkpoint : chaque ligne devrait contenir heure, source, fait observé, hypothèse, confiance et question ouverte. Quand tu sépares ces colonnes, tu évites de transformer une impression en certitude."
    },
    en: {
      words: "Word by word: forensic means analyzing traces after an event. Timeline means ordering facts in time. Artifact means useful trace, such as log, file, account, or connection. Hypothesis means interpretation. Confidence means strength of evidence.",
      guided: "Guided example: you see a sign-in at 10:03, a file modified at 10:05, then an alert at 10:08. Do not immediately say 'attack complete'. Write the facts, source of each fact, time zone, then what you can carefully infer.",
      mistake: "Common trap: telling a story too fast. A timeline is not a novel, it is a table of facts. If times come from different sources or time zones, the conclusion stays careful until correlation.",
      checkpoint: "Checkpoint: every line should contain time, source, observed fact, hypothesis, confidence, and open question. When you separate these columns, you avoid turning an impression into certainty."
    }
  }
} satisfies Record<string, BeginnerDeepDive>;

for (const [slug, deepDive] of Object.entries(beginnerDeepDives)) {
  const course = courses.find((item) => item.slug === slug);

  if (course) {
    course.sections.fr = [
      { title: "Mot par mot", body: deepDive.fr.words },
      { title: "Exemple guidé pas à pas", body: deepDive.fr.guided },
      { title: "Erreur classique à éviter", body: deepDive.fr.mistake },
      { title: "Checkpoint débutant", body: deepDive.fr.checkpoint },
      ...course.sections.fr
    ];
    course.sections.en = [
      { title: "Word by word", body: deepDive.en.words },
      { title: "Guided example step by step", body: deepDive.en.guided },
      { title: "Common trap to avoid", body: deepDive.en.mistake },
      { title: "Beginner checkpoint", body: deepDive.en.checkpoint },
      ...course.sections.en
    ];
  }
}

for (const [slug, enhancement] of Object.entries(courseEnhancements)) {
  const course = courses.find((item) => item.slug === slug);

  if (course) {
    course.sections.fr = [...course.sections.fr, ...enhancement.sections.fr];
    course.sections.en = [...course.sections.en, ...enhancement.sections.en];
    course.exercises = {
      fr: enhancement.exercises.fr.map((exercise, index) => ({ ...exercise, solution: exerciseSolutions[slug]?.fr[index] })),
      en: enhancement.exercises.en.map((exercise, index) => ({ ...exercise, solution: exerciseSolutions[slug]?.en[index] }))
    };
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
