import networkx as nx
import matplotlib.pyplot as plt

edges = [
   {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/gb/launch?s=upcoming',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/eg',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/ma/en',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/ma',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/za',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/ca',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/ca/fr',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/mx',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/pr',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/us/es',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/xl',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/au',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/in',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/id',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/jp/en',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/jp',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/kr',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/my',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/nz',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/ph',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/sg',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/tw',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/th',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/vn',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/be/de',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/be/en',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/be/fr',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/be',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/bg',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/hr',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/cz',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/cz/en',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/dk',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/dk/en',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/fi',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/fr',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/de',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/gr',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/hu/en',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/hu',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/ie',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/il',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/it',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/lu/de',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/lu/en',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/lu',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/nl/en',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/nl',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/no/en',
    "fromDepth": 2,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at',
    "to": 'https://www.nike.com/no',
    "fromDepth": 2,
    "toDepth": 2
  },
]


G = nx.DiGraph()

for edge in edges:
    G.add_edge(edge['from'], edge['to'], fromDepth=edge['fromDepth'], toDepth=edge['toDepth'])


pos = nx.spring_layout(G, k=0.5) 

node_depth = {}
for edge in edges:
    node_depth[edge['from']] = edge['fromDepth']
    node_depth[edge['to']] = edge['toDepth']

colors = [node_depth[node] for node in G.nodes()]

plt.figure(figsize=(12, 8))
nx.draw(G, pos, node_color=colors, cmap=plt.cm.viridis, with_labels=False, node_size=100, arrows=True)
plt.title("Nike Link-Graph (Knoten nach Tiefe eingefärbt)")
plt.show()
