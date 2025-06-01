import networkx as nx
import matplotlib.pyplot as plt
from urllib.parse import urlparse

edges = [
  {
    "from": 'https://www.nike.com/at/jordan',
    "to": 'https://www.nike.com/gb/launch?s=upcoming',
    "fromDepth": 3,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at/retail',
    "to": 'https://www.nike.com/gb/launch?s=upcoming',
    "fromDepth": 3,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at/help',
    "to": 'https://www.nike.com/gb/launch?s=upcoming',
    "fromDepth": 3,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at/orders/details',
    "to": 'https://www.nike.com/gb/launch?s=upcoming',
    "fromDepth": 3,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at/help/a/versand-lieferung-eu',
    "to": 'https://www.nike.com/gb/launch?s=upcoming',
    "fromDepth": 3,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at/help/a/ruckgaberichtlinie-eu',
    "to": 'https://www.nike.com/gb/launch?s=upcoming',
    "fromDepth": 3,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at/help/a/grossentabellen-eu',
    "to": 'https://www.nike.com/gb/launch?s=upcoming',
    "fromDepth": 3,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at/membership',
    "to": 'https://www.nike.com/gb/launch?s=upcoming',
    "fromDepth": 3,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at/membership',
    "to": 'https://www.nike.com/register',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/membership',
    "to": 'https://www.nike.com/register',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/membership',
    "to": 'https://www.nike.com/gb/membership/member-product',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/membership',
    "to": 'https://www.nike.com/gb/membership/member-product',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/membership',
    "to": 'https://www.nike.com/gb/membership/member-rewards',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/membership',
    "to": 'https://www.nike.com/gb/membership/member-rewards',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/membership',
    "to": 'https://www.nike.com/gb/nike-by-you',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/membership',
    "to": 'https://www.nike.com/gb/nike-by-you',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/membership',
    "to": 'https://www.nike.com/snkrs-app',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/membership',
    "to": 'https://www.nike.com/snkrs-app',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/membership',
    "to": 'https://www.nike.com/gb/membership/member-product',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/membership',
    "to": 'https://www.nike.com/gb/membership/member-product',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/membership',
    "to": 'https://www.nike.com/gb/membership/member-rewards',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/membership',
    "to": 'https://www.nike.com/gb/membership/member-rewards',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/membership',
    "to": 'https://www.nike.com/gb/nike-by-you',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/membership',
    "to": 'https://www.nike.com/gb/nike-by-you',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/membership',
    "to": 'https://www.nike.com/snkrs-app',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/membership',
    "to": 'https://www.nike.com/snkrs-app',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/membership',
    "to": 'http://www.nike.com/register',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/membership',
    "to": 'http://www.nike.com/register',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/w/neu-3n82y',
    "to": 'https://www.nike.com/gb/launch?s=upcoming',
    "fromDepth": 3,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/at/w/bestseller-76m50',
    "to": 'https://www.nike.com/gb/launch?s=upcoming',
    "fromDepth": 3,
    "toDepth": 2
  },
  {
    "from": 'https://www.nike.com/gb/launch?s=upcoming',
    "to": 'https://www.nike.com/pdf/limited-retirement-benefits-scheme-statement-investment-principles-sip-en-gb.pdf',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/gb/launch?s=upcoming',
    "to": 'https://www.nike.com/pdf/limited-retirement-benefits-scheme-statement-investment-principles-sip-en-gb.pdf',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/geschenke',
    "to": 'https://www.nike.com/gb/launch?s=upcoming',
    "fromDepth": 3,
    "toDepth": 3
  },
  {
    "from": 'https://www.nike.com/at/geschenke',
    "to": 'https://www.nike.com/gb/help/a/nike-gift-bags',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/geschenke',
    "to": 'https://www.nike.com/gb/help/a/nike-gift-bags',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/geschenke',
    "to": 'https://www.nike.com/gb/help/a/click-collect',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/geschenke',
    "to": 'https://www.nike.com/gb/help/a/click-collect',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/geschenke',
    "to": 'https://www.nike.com/gb/help/a/nike-gift-bags',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/geschenke',
    "to": 'https://www.nike.com/gb/help/a/nike-gift-bags',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/geschenke',
    "to": 'https://www.nike.com/gb/help/a/click-collect',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/geschenke',
    "to": 'https://www.nike.com/gb/help/a/click-collect',
    "fromDepth": 3,
    "toDepth": 4
  },
  {
    "from": 'https://www.nike.com/at/w/sommer-essentials-6pei9',
    "to": 'https://www.nike.com/gb/launch?s=upcoming',
    "fromDepth": 3,
    "toDepth": 3
  },
  {
    "from": 'https://www.nike.com/at/w/schuhe-y7ok',
    "to": 'https://www.nike.com/gb/launch?s=upcoming',
    "fromDepth": 3,
    "toDepth": 3
  },
  {
    "from": 'https://www.nike.com/at/w/jordan-1-schuhe-4fokyzy7ok',
    "to": 'https://www.nike.com/gb/launch?s=upcoming',
    "fromDepth": 3,
    "toDepth": 3
  },
  {
    "from": 'https://www.nike.com/at/w/air-max-schuhe-a6d8hzy7ok',
    "to": 'https://www.nike.com/gb/launch?s=upcoming',
    "fromDepth": 3,
    "toDepth": 3
  },
  {
    "from": 'https://www.nike.com/at/w/dunk-schuhe-90aohzy7ok',
    "to": 'https://www.nike.com/gb/launch?s=upcoming',
    "fromDepth": 3,
    "toDepth": 3
  },
  {
    "from": 'https://www.nike.com/at/w/blazer-schuhe-9gw3azy7ok',
    "to": 'https://www.nike.com/gb/launch?s=upcoming',
    "fromDepth": 3,
    "toDepth": 3
  },
  {
    "from": 'https://www.nike.com/at/w/pegasus-running-schuhe-37v7jz8nexhzy7ok',
    "to": 'https://www.nike.com/gb/launch?s=upcoming',
    "fromDepth": 3,
    "toDepth": 3
  },
  {
    "from": 'https://www.nike.com/at/w/mercurial-football-schuhe-1gdj0z4f1bzy7ok',
    "to": 'https://www.nike.com/gb/launch?s=upcoming',
    "fromDepth": 3,
    "toDepth": 3
  },
  {
    "from": 'https://www.nike.com/at/w/jordan-37eef',
    "to": 'https://www.nike.com/gb/launch?s=upcoming',
    "fromDepth": 3,
    "toDepth": 3
  }


]


#code inspired: https://medium.com/@nelsonjoseph123/graph-visualization-using-python-bbd9a593c533

unique_nodes = []
node_depth = {}
for edge in edges:
    for url, depth in [(edge["from"], edge["fromDepth"]), (edge["to"], edge["toDepth"])]:
        if url not in unique_nodes:
            unique_nodes.append(url)
            node_depth[url] = depth

node_numbers = {url: idx + 1 for idx, url in enumerate(unique_nodes)}

G = nx.DiGraph()
for edge in edges:
    G.add_edge(edge['from'], edge['to'], fromDepth=edge['fromDepth'], toDepth=edge['toDepth'])

pos = nx.spring_layout(G, k=0.6)

node_labels = {node: str(node_numbers[node]) for node in G.nodes()}

plt.figure(figsize=(20, 14))
nx.draw(
    G,
    pos,
    node_color='skyblue',
    with_labels=False,
    node_size=400,
    arrows=True,
    edge_color='gray',
    width=2
)

label_pos = {node: (x, y + 0.04) for node, (x, y) in pos.items()}
nx.draw_networkx_labels(G, label_pos, labels=node_labels, font_size=20, font_color='black')

plt.title("Weekday Graph (Nodes mit Nummern)", fontsize=26)
plt.tight_layout()
plt.show()

print("\nNode-Legende (Tabelle):\n")
print(f"{'Nr.':<4} {'Tiefe':<5} {'Pfad'}")
for node in unique_nodes:
    nr = node_numbers[node]
    depth = node_depth.get(node, "-")
    parsed = urlparse(node)
    pfad = parsed.path if parsed.path else "/"
    print(f"{nr:<4} {depth:<5} {pfad}")


