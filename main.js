
const fetch = require('node-fetch');


// const API_KEY = 'mjDi77rMDBA17avvsjqPF-P9eoukSyaJ5wzeUsnDMY8'




const runEngine = async () => {
    const requestHeaders = {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    }
  
    const response = await fetch("https://engines.primer.ai/api/v1/entities/relations_v2", {
      method: "POST",
      headers: requestHeaders,
      body: "{\"text\":\"The confrontation between reformers led by new party boss Alexander Dubcek and conservatives headed by his ousted predecessor, Antonin Novotny, could get out of hand. The power struggle is no longer a purely intraparty affair because large segments of the population have become embroiled.\\nDubcek's widely welcomed \\\"action program\\\" calls for a sharp reduction in the party's role and for the \\\"widest possible democratization of the entire sociopolitical system.\\\" Conservatives fear this goes too far, and have countered with an attack on the program's weakest point, its commitment to vigorous implementation of the lagging economic reform. They have been playing on fears that reform will mean loss of jobs, rising prices, and a drop in the standard of living, and are trying to sow distrust between workers and \\\"radical intellectual reformers,\\\" by implication including Dubcek.\\nDubcek has rallied considerable support. Associations of writers, journalists, and farmers have pledged their aid. The chairman of the parliament and the key party boss of the city of Prague have deserted Novotny. Dubcek can probably count on party support in Slovakia and Moravia, but Bohemia is in doubt. He has taken steps to controlthe armed forces and the secret police. He has also recently relaxed censorship to a significant extent, a step that could aid his supporters. Novotny's strength lies among ideological conservatives, industrial workers, and the bureaucracy.\\nThe struggle could come to a head in mid-March when the central committee meets to decide on the action program. Because Novotny and Dubcek have been appealing for and receiving support from extremist wings in the regime, they may lose control of the situation, and face the risk of domestic disorders.\\nSoviet and East European leaders who came to Prague last week for the 20th anniversary of the Communist take-over were unmistakably reserved. Although they pretended nothing was amiss, they would seem to have cause for concern. The potential implications for internal developments in their own countries probably were foremost in their thoughts, particularly among the Poles, who are trying to squelch already emboldened intellectuals. The Poles, as well as the East Germans, are also fearful of the impact of Czechoslovak developments on Prague's relations with West Germany.\\nThe visiting Communist leaders appeared to avoid involvement in the intraparty struggle. Few of them mentioned Dubcek by name and none of them alluded to the action program. Brezhnev left as soon as he decently could, not even staying to hear Novotny's speech. Neither he nor the others responded to Dubcek's public assurance that this \\\"period of struggle\\\" would become \\\"surrounded by glory\\\" in future years.\"}",
    })
  
    const data = await response.json()
  
    console.log('Engine data:', data)
  }
  
  runEngine()