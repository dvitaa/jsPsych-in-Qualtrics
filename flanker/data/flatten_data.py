import json
import pandas as pd
import sys

if __name__ == '__main__':
    filename = sys.argv[1]
    df_trials = pd.read_csv(filename)
    dfs = []
    for index, x in df_trials.iterrows():
        x = dict(x)
        if x['flanker_trials']:
            print(x['flanker_trials'])
            this_trials = json.loads(x['flanker_trials'])
            this_df = pd.DataFrame(this_trials)
            for col in x:
                if col != 'flanker_trials':
                    this_df[col] = x[col]
            dfs.append(this_df)

    df_final = pd.concat(dfs).sort_values(by='ResponseId').reset_index(drop='True')
    df_final.to_csv(f"{filename.split('.')[0]}_flattened.csv") 









