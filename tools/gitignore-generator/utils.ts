export interface GitTemplate {
  display: string;
  content: string;
  keywords?: string[];
}

export const TEMPLATES: Record<string, GitTemplate> = {
  node: {
    display: 'Node.js',
    keywords: ['node', 'npm', 'yarn'],
    content: `# Dependencies\nnode_modules/\npnpm-lock.yaml\nyarn.lock\npackage-lock.json\n\n# Build\n.next/\ndist/\nbuild/\nout/\n\n# Env\n.env\n.env.local\n.env.*.local\n`,
  },
  nextjs: {
    display: 'Next.js',
    keywords: ['next', 'react', 'vercel'],
    content: `# Next.js\n.next/\nout/\n\n# Vercel\n.vercel\n\n# Env\n.env*.local\n`,
  },
  react: {
    display: 'React (CRA / Vite)',
    keywords: ['react', 'cra', 'vite'],
    content: `# Dependencies\nnode_modules/\n\n# Build\nbuild/\ndist/\n\n# Misc\n.DS_Store\n*.log\n`,
  },
  vue: {
    display: 'Vue.js',
    keywords: ['vue', 'nuxt'],
    content: `# Dependencies\nnode_modules/\n\n# Build\ndist/\n.nuxt/\n.output/\n\n# Env\n.env\n`,
  },
  python: {
    display: 'Python',
    keywords: ['python', 'pip', 'django', 'flask', 'fastapi'],
    content: `# Byte-compiled\n__pycache__/\n*.py[cod]\n*$py.class\n\n# Virtual envs\nvenv/\nENV/\n.env\n\n# Distribution\nbuild/\ndist/\n*.egg-info/\n`,
  },
  django: {
    display: 'Django',
    keywords: ['django'],
    content: `# Django\n*.log\nlocal_settings.py\ndb.sqlite3\nmedia/\nstaticfiles/\n`,
  },
  rails: {
    display: 'Ruby on Rails',
    keywords: ['rails', 'ruby'],
    content: `# Rails\n*.log\n*.sqlite3\n*.sqlite3-*\n/public/assets\n/tmp/\n`,
  },
  java: {
    display: 'Java / Maven / Gradle',
    keywords: ['java', 'maven', 'gradle', 'spring'],
    content: `# Java\n*.class\n*.jar\n*.war\n*.ear\n\n# Build\ntarget/\nbuild/\n.gradle/\n.idea/\n*.iml\n`,
  },
  go: {
    display: 'Go',
    keywords: ['go', 'golang'],
    content: `# Go\n*.exe\n*.exe~\n*.dll\n*.so\n*.dylib\n\n# Test binary\n*.test\n\n# Output\nbin/\n`,
  },
  rust: {
    display: 'Rust',
    keywords: ['rust', 'cargo'],
    content: `# Rust\n/target/\n**/*.rs.bk\nCargo.lock\n`,
  },
  php: {
    display: 'PHP',
    keywords: ['php', 'composer'],
    content: `# PHP\n/vendor/\ncomposer.lock\n*.log\n`,
  },
  laravel: {
    display: 'Laravel',
    keywords: ['laravel'],
    content: `# Laravel\n/vendor/\n/node_modules/\n/public/hot\n/public/storage\n/storage/*.key\n.env\n.env.backup\n.phpunit.result.cache\n`,
  },
  dotnet: {
    display: '.NET / C#',
    keywords: ['dotnet', 'csharp', '.net'],
    content: `# .NET\nbin/\nobj/\n*.user\n*.suo\n.vs/\n`,
  },
  android: {
    display: 'Android',
    keywords: ['android', 'kotlin', 'gradle'],
    content: `# Android\n*.apk\n*.aab\n*.dex\n*.class\nbin/\ngen/\n.gradle/\nlocal.properties\n.idea/\n*.iml\n`,
  },
  ios: {
    display: 'iOS / Swift / Xcode',
    keywords: ['ios', 'swift', 'xcode'],
    content: `# Xcode\n*.xcworkspace\n*.xcodeproj\nDerivedData/\n*.hmap\n*.ipa\n*.dSYM.zip\n*.dSYM\n`,
  },
  macos: {
    display: 'macOS',
    keywords: ['mac', 'osx'],
    content: `# macOS\n.DS_Store\n.AppleDouble\n.LSOverride\nIcon\r\n._*\n.DocumentRevisions-V100\n.fseventsd\n.Spotlight-V100\n.TemporaryItems\n.Trashes\n.VolumeIcon.icns\n.com.apple.timemachine.donotpresent\n.AppleDB\n.AppleDesktop\nNetwork Trash Folder\nTemporary Items\n.apdisk\n`,
  },
  windows: {
    display: 'Windows',
    keywords: ['windows', 'win'],
    content: `# Windows\nThumbs.db\nehthumbs.db\nehthumbs_vista.db\n*.stackdump\n[Dd]esktop.ini\n$RECYCLE.BIN/\n*.cab\n*.msi\n*.msix\n*.msm\n*.msp\n*.lnk\n`,
  },
  linux: {
    display: 'Linux',
    keywords: ['linux'],
    content: `# Linux\n*~\n\n# temporary files which can be created if a process still has a handle open\n.nfs*\n`,
  },
  vscode: {
    display: 'VS Code',
    keywords: ['vscode', 'vs code'],
    content: `.vscode/\n*.code-workspace\n`,
  },
  intellij: {
    display: 'IntelliJ / WebStorm / PyCharm',
    keywords: ['intellij', 'idea', 'webstorm'],
    content: `# JetBrains\n.idea/\n*.iml\n*.iws\nout/\n`,
  },
  vim: {
    display: 'Vim',
    keywords: ['vim'],
    content: `# Vim\n[._]*.s[a-v][a-z]\n[._]*.sw[a-p]\n[._]s[a-rt-v][a-z]\n[._]ss[a-gi-z]\n[._]sw[a-p]\nSession.vim\n.netrwhist\n*~\n`,
  },
  jupyter: {
    display: 'Jupyter Notebooks',
    keywords: ['jupyter', 'ipynb', 'notebook'],
    content: `# Jupyter\n.ipynb_checkpoints\n*.ipynb\n`,
  },
  docker: {
    display: 'Docker',
    keywords: ['docker'],
    content: `# Docker\n.dockerignore\n`,
  },
  terraform: {
    display: 'Terraform',
    keywords: ['terraform', 'tf'],
    content: `# Terraform\n.terraform/\n*.tfstate\n*.tfstate.*\ncrash.log\ncrash.*.log\noverride.tf\noverride.tf.json\n*_override.tf\n*_override.tf.json\n.terraformrc\nterraform.rc\n`,
  },
  kubernetes: {
    display: 'Kubernetes',
    keywords: ['k8s', 'kubernetes'],
    content: `# Kubernetes\n*.kube/config\n`,
  },
};

export function combineTemplates(selected: string[], custom: string = ''): string {
  const sections: string[] = [];

  selected.forEach(key => {
    const t = TEMPLATES[key];
    if (t) {
      sections.push(`# ${t.display}\n${t.content.trim()}`);
    }
  });

  let out = sections.join('\n\n');

  const customTrim = custom.trim();
  if (customTrim) {
    out += `\n\n# Custom / Project Specific\n${customTrim}`;
  }

  // Dedupe simple duplicate lines (keep order of first appearance)
  const seen = new Set<string>();
  const lines = out.split('\n').filter(line => {
    const t = line.trim();
    if (!t || seen.has(t)) return false;
    seen.add(t);
    return true;
  });

  return lines.join('\n').trim() + '\n';
}

export function getAllTemplateKeys(): string[] {
  return Object.keys(TEMPLATES);
}

export function searchTemplates(q: string): string[] {
  const lower = q.toLowerCase().trim();
  if (!lower) return getAllTemplateKeys();
  return getAllTemplateKeys().filter(k => {
    const t = TEMPLATES[k];
    if (!t) return false;
    return k.includes(lower) || t.display.toLowerCase().includes(lower) || (t.keywords || []).some(kw => kw.includes(lower));
  });
}

export function downloadGitignore(content: string) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = '.gitignore';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
