import json
import pandas as pd
import sys

if __name__ == '__main__':
    filename = sys.argv[1]
    df_trials = pd.read_csv(filename)
    flanker_dfs = []
    stroop_dfs = []
    for index, x in df_trials.iterrows():
        x = dict(x)
        if 'flanker_trials' in x and x['flanker_trials']:
            print(x['flanker_trials'])
            flanker_trials = json.loads(x['flanker_trials'])
            this_df = pd.DataFrame(flanker_trials)
            this_df['ResponseId'] = x['ResponseId']
            flanker_dfs.append(this_df)
            
        if 'num_columns' in x and x['num_columns']:
            stroop_trials = []
            for i in range(x['num_columns']):
                stroop_trials += list(json.loads(x['stroop_trials_'+str(i)]))
            
            this_df = pd.DataFrame(stroop_trials)
            this_df['ResponseId'] = x['ResponseId']
            stroop_dfs.append(this_df)           
                
            
    # flanker_final = pd.concat(flanker_dfs).sort_values(by='ResponseId').reset_index(drop='True')
    # flanker_final.to_csv(f"{filename.split('.')[0]}_flanker_flattened.csv") 
    stroop_final = pd.concat(stroop_dfs).sort_values(by='ResponseId').reset_index(drop='True')
    stroop_final.to_csv(f"{filename.split('.')[0]}_stroop_flattened.csv") 



# python3 flatten_data.py pilotcleaned.csv

