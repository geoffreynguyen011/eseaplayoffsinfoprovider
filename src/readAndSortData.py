# how to sort:
# first, sort all teams by wins
# then, for each team with equal number of wins, sort by losses
# for each of those teams, sort by rounds won
# then sort by rounds lost (although not entirely necessary, but good implementation)
# repeat for each

file1 = open('data.txt', 'r')
# file1 = open('test_data.txt', 'r')
Lines = file1.readlines()
# print(Lines)

count = 0

# format: [
#     [id, teamname, wins, losses, ties, win %, streak, rounds won, rounds lost],
#     [id, teamname2, wins, losses, ties, win %, streak, rounds won, rounds lost],
#      ...
# ]
array_of_each_team = []
total_array = []

# gets each team and its stats
for index, line in enumerate(Lines):
    # id, team_name, wins, losses, ties, win_percent, streak, rounds_won, rounds_lost
    team_name, wins, losses, ties, win_percent, streak, rounds_won, rounds_lost = "", "", "", "", "", "", "", ""
    # start from back, and get each metric
    if line[0] == "/":
        continue
    i = len(line) - 2
    current_array = []
    while line[i] != " ":
        rounds_lost = line[i] + rounds_lost
        i -= 1
    current_array.insert(0, int(rounds_lost))
    i -= 1
    while line[i] != " ":
        rounds_won = line[i] + rounds_won
        i -= 1
    current_array.insert(0, int(rounds_won))

    i -= 1
    while line[i] != " ":
        streak = line[i] + streak
        i -= 1
    current_array.insert(0, streak)
    i -= 1
    while line[i] != " ":
        win_percent = line[i] + win_percent
        i -= 1
    current_array.insert(0, win_percent)
    i -= 1
    while line[i] != " ":
        ties = line[i] + ties
        i -= 1
    current_array.insert(0, int(ties))
    i -= 1
    while line[i] != " ":
        losses = line[i] + losses
        i -= 1
    current_array.insert(0, int(losses))
    i -= 1
    while line[i] != " ":
        wins = line[i] + wins
        i -= 1
    current_array.insert(0, int(wins))
    i -= 1
    while line[i] != "." and i > 1:
        team_name = line[i] + team_name
        i -= 1
    team_name = team_name[1:]
    current_array.insert(0, team_name)
    current_array.insert(0, index)
    
    # print(current_array)

    total_array.append(current_array)

    current_array = []
# print(total_array)

# all teams now in array with eight values in each array

# sort data by wins first
def sortTeamsByWin():
    total_array.sort(key=lambda x:x[2], reverse=True)

def sortTeamsByLoss(array_of_teams_with_equal_wins):
    if len(array_of_teams_with_equal_wins) == 1:
        return array_of_teams_with_equal_wins
# def sortTeamsByLoss(numLosses):
#     startingIndex = 0
#     while total_array[startingIndex][2] != numLosses:
#         startingIndex += 1
#     endingIndex = startingIndex
#     while total_array[endingIndex][2] == numLosses:
#         endingIndex += 1
#     array_of_teams_with_equal_wins = total_array[startingIndex:endingIndex]
    newly_sorted_array = []
    lowIndex = 0
    highIndex = 0

    array_of_teams_with_equal_wins.sort(key=lambda x:x[3])
    # for i in array_of_teams_with_equal_wins:
    #     print(i)
    # print("BREAK")
    while highIndex < len(array_of_teams_with_equal_wins):
        if array_of_teams_with_equal_wins[lowIndex][3] == array_of_teams_with_equal_wins[highIndex][3]:
            while array_of_teams_with_equal_wins[lowIndex][3] == array_of_teams_with_equal_wins[highIndex][3] and highIndex < len(array_of_teams_with_equal_wins):
                highIndex += 1
            array_to_append = sortTeamsByRoundsWon(array_of_teams_with_equal_wins[lowIndex:highIndex])
            for i in array_to_append:
                newly_sorted_array.append(i)
            lowIndex = highIndex - 1
        else:
            newly_sorted_array.append(array_of_teams_with_equal_wins[highIndex])
        highIndex += 1
    return newly_sorted_array
    

# sort data by rounds won next, passing in wins and losses as parameters

def sortTeamsByRoundsWon(array_of_teams_with_equal_losses):
    if len(array_of_teams_with_equal_losses) == 1:
        return array_of_teams_with_equal_losses
    newly_sorted_array = []
    lowIndex = 0
    highIndex = 1
    # print(len(array_of_teams_with_equal_losses))

    array_of_teams_with_equal_losses.sort(key=lambda x:x[7], reverse=True)
    # for i in array_of_teams_with_equal_losses:
    #     print(i)
    while highIndex < len(array_of_teams_with_equal_losses):
        if array_of_teams_with_equal_losses[lowIndex][7] != array_of_teams_with_equal_losses[highIndex][7]:
            newly_sorted_array.append(array_of_teams_with_equal_losses[lowIndex])
            highIndex += 1
            lowIndex += 1
        else:
            while array_of_teams_with_equal_losses[lowIndex][7] == array_of_teams_with_equal_losses[highIndex][7]:
                if highIndex < len(array_of_teams_with_equal_losses) - 1:
                    highIndex += 1
                else:
                    array_to_append = sortTeamsByRoundsLost(array_of_teams_with_equal_losses[lowIndex:highIndex + 1])
                    break
                array_to_append = sortTeamsByRoundsLost(array_of_teams_with_equal_losses[lowIndex:highIndex])
            for i in array_to_append:
                newly_sorted_array.append(i)
            lowIndex = highIndex
        print(highIndex)
    if array_of_teams_with_equal_losses[highIndex][7] != array_of_teams_with_equal_losses[highIndex - 1][7]:
        newly_sorted_array.append(array_of_teams_with_equal_losses[highIndex][7])
    return newly_sorted_array
        

def sortTeamsByRoundsLost(array_of_teams_with_equal_rounds_won):
    # print(array_of_teams_with_equal_rounds_won)
    if len(array_of_teams_with_equal_rounds_won) == 1:
        return array_of_teams_with_equal_rounds_won
    array_of_teams_with_equal_rounds_won.sort(key=lambda x:x[8])
    return array_of_teams_with_equal_rounds_won


# sortTeamsByWin()
# arr = sortTeamsByLoss(10)
# for i in arr:
#     print(i)
# testArray = [[1, "Redux eSports", 10, 2, 0, "83.00%", "L1", 174, 107],[2, "Renvate", 10, 3, 0, "77.00%", "L1", 197, 115],[3, "Akiba Gaming", 10, 3, 0, "77.00%", "W5", 190, 150],[4, "Team Cataclysm", 10, 3, 0, "77.00%", "L1", 189, 125],[5, "MadNecessity", 10, 3, 0, "77.00%", "L1", 184, 139],[6, "Uncharted", 10, 4, 0, "71.00%", "L1", 209, 148],[7, "Rated Gaming", 10, 4, 0, "71.00%", "L1", 209, 144],[8, "LMFAOOget rolled gigadog", 10, 4, 0, "71.00%", "W1", 208, 135],[9, "Wise Guys", 10, 4, 0, "71.00%", "L1", 208, 156],[10, "Digital Dynasty", 10, 4, 0, "71.00%", "W1", 208, 156],[11, "Macdonia, The Former Yugoslav Republic Of  Metins Mangos v2", 10, 4, 0, "71.00%", "W1", 207, 129],[12, "FilthyCasuals", 10, 4, 0, "71.00%", "W1", 207, 149],[13, "Big Honkers", 10, 4, 0, "71.00%", "W1", 206, 131],[14, "Big Rigger Esports", 10, 4, 0, "71.00%", "W1", 206, 137],[15, "ON PAZUZU", 10, 4, 0, "71.00%", "W4", 206, 147],[16, "En ode Salvail", 10, 4, 0, "71.00%", "W8", 205, 103],[17, "Chupapi Munyayo", 10, 4, 0, "71.00%", "W1", 205, 141],[18, "Dirty Thirties", 10, 4, 0, "71.00%", "W3", 205, 142],[19, "SKDC", 10, 4, 0, "71.00%", "L1", 204, 130],[20, "VICE Gaming", 10, 4, 0, "71.00%", "L3", 204, 148],[21, "Trevs Money Crew", 10, 4, 0, "71.00%", "W4", 203, 149],[22, "Skull Kings", 10, 4, 0, "71.00%", "W6", 203, 186],[23, "p gang", 10, 4, 0, "71.00%", "L3", 202, 143],[24, "Legion Esports Academy", 10, 4, 0, "71.00%", "W1", 202, 156],[25, "SK Gaming", 10, 4, 0, "71.00%", "W7", 201, 135],[26, "Smarter Esports", 10, 4, 0, "71.00%", "W3", 200, 121],[27, "Wis Pixels", 10, 4, 0, "71.00%", "W2", 200, 141],[28, "Core-5", 10, 4, 0, "71.00%", "W1", 199, 146],[29, "Late Night Crew", 10, 4, 0, "71.00%", "W6", 199, 154],[30, "Balsack United", 10, 4, 0, "71.00%", "L2", 199, 157],[31, "SteensWifus", 10, 4, 0, "71.00%", "W8", 195, 120],[32, "Triger-Happy", 10, 4, 0, "71.00%", "W6", 193, 159],[33, "All Cops are Pog", 10, 4, 0, "71.00%", "W4", 191, 145],[34, "Kins of Swing", 10, 4, 0, "71.00%", "W2", 191, 148],[35, "LesPTI Bums", 10, 4, 0, "71.00%", "L2", 189, 159],[36, "REST IN PISS BOZO", 10, 4, 0, "71.00%", "W4", 179, 138]]
testArray = [[451, 'Redux eSports', 10, 2, 0, '83.00%', 'L1', 174, 107],[20, 'Akiba Gaming', 10, 3, 0, '77.00%', 'W5', 190, 150],[253, 'Team Cataclysm', 10, 3, 0, '77.00%', 'L1', 189, 125],[254, 'MadNecessity', 10, 3, 0, '77.00%', 'L1', 184, 139],[452, 'Renvate', 10, 3, 0, '77.00%', 'L1', 197, 115],[21, 'Uncharted', 10, 4, 0, '71.00%', 'L1', 209, 148],[22, 'Digital Dynasty', 10, 4, 0, '71.00%', 'W1', 208, 156],[23, 'Macdonia, The Former Yugoslav Republic Of  Metins Mangos v2', 10, 4, 0, '71.00%', 'W1', 207, 129],[24, 'FilthyCasuals', 10, 4, 0, '71.00%', 'W1', 207, 149],[25, 'Big Honkers', 10, 4, 0, '71.00%', 'W1', 206, 131],[26, 'ON PAZUZU', 10, 4, 0, '71.00%', 'W4', 206, 147],[27, 'Chupapi Munyayo', 10, 4, 0, '71.00%', 'W1', 205, 141],[28, 'VICE Gaming', 10, 4, 0, '71.00%', 'L3', 204, 148],[29, 'Trevs Money Crew', 10, 4, 0, '71.00%', 'W4', 203, 149],[30, 'Legion Esports Academy', 10, 4, 0, '71.00%', 'W1', 202, 156],[31, 'Smarter Esports', 10, 4, 0, '71.00%', 'W3', 200, 121],[32, 'Balsack United', 10, 4, 0, '71.00%', 'L2', 199, 157],[33, 'SteensWifus', 10, 4, 0, '71.00%', 'W8', 195, 120],[34, 'All Cops are Pog', 10, 4, 0, '71.00%', 'W4', 191, 145],[255, 'Rated Gaming', 10, 4, 0, '71.00%', 'L1', 209, 144],[256, 'Wise Guys', 10, 4, 0, '71.00%', 'L1', 208, 156],[257, 'Big Rigger Esports', 10, 4, 0, '71.00%', 'W1', 206, 137],[258, 'En ode Salvail', 10, 4, 0, '71.00%', 'W8', 205, 103],[259, 'Dirty Thirties', 10, 4, 0, '71.00%', 'W3', 205, 142],[260, 'Skull Kings', 10, 4, 0, '71.00%', 'W6', 203, 186],[261, 'p gang', 10, 4, 0, '71.00%', 'L3', 202, 143],[262, 'SK Gaming', 10, 4, 0, '71.00%', 'W7', 201, 135],[263, 'Wis Pixels', 10, 4, 0, '71.00%', 'W2', 200, 141],[264, 'Core-5', 10, 4, 0, '71.00%', 'W1', 199, 146],[265, 'LesPTI Bums', 10, 4, 0, '71.00%', 'L2', 189, 159],[266, 'REST IN PISS BOZO', 10, 4, 0, '71.00%', 'W4', 179, 138],[453, 'LMFAOOget rolled gigadog', 10, 4, 0, '71.00%', 'W1', 208, 135],[454, 'SKDC', 10, 4, 0, '71.00%', 'L1', 204, 130],[455, 'Late Night Crew', 10, 4, 0, '71.00%', 'W6', 199, 154],[456, 'Triger-Happy', 10, 4, 0, '71.00%', 'W6', 193, 159],[457, 'Kins of Swing', 10, 4, 0, '71.00%', 'W2', 191, 148],[451, 'Redux eSports', 10, 2, 0, '83.00%', 'L1', 174, 107]]
# printing = sortTeamsByLoss(testArray)
printing = sortTeamsByRoundsWon(testArray)
# printing = sortTeamsByRoundsLost(testArray)
for i in printing:
    print(i)