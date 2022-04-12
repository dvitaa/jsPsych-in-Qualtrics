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
            flanker_trials = json.loads(x['flanker_trials'])
            this_df = pd.DataFrame(flanker_trials)
            for col in x:
                if col not in ['flanker_trials', 'stroop_trials']:
                    this_df[col] = x[col]
            dfs.append(this_df)
            
            if x['stroop_trials']: 
                print(x['stroop_trials'])
                stroop_trials = json.loads(x['stroop_trials'])
                for col in stroop_trials: 
                    if col not in ['flanker_trials', 'stroop_trials']:
                        this_df[col] = stroop_trials[col]
            print(this_df)
            # sys.exit()
            dfs.append(this_df)
                # stroop_df = pd.DataFrame(stroop_trials)
                
            
        
            
    df_final = pd.concat(dfs).sort_values(by='ResponseId').reset_index(drop='True')
    df_final.to_csv(f"{filename.split('.')[0]}_flattened.csv") 




# python3 flatten_data.py pilotcleaned.csv

