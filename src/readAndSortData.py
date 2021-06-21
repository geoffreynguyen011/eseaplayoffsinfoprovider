file1 = open('data.txt', 'r')
Lines = file1.readlines()

count = 0

# format: [
#     [teamname, wins, losses, ties, win %, streak, rounds won, rounds lost],
#     [teamname2, wins, losses, ties, win %, streak, rounds won, rounds lost],
# ]
array_of_each_team = []
total_array = []


# gets each team and its stats
print(Lines[:10])
for line in Lines[:10]:
    team_name, wins, losses, ties, win_percent, streak, rounds_won, rounds_lost = "", "", "", "", "", "", "", ""
    # start from back, and get each metric
    # print(line)
    if line[0] == "/":
        continue
    i = len(line) - 2
    current_array = []
    while line[i] != " ":
        rounds_lost = line[i] + rounds_lost
        i -= 1
    current_array.insert(0, rounds_lost)
    i -= 1
    while line[i] != " ":
        rounds_won = line[i] + rounds_won
        i -= 1
    current_array.insert(0, rounds_won)


    
    i -= 1
    while line[i] != " ":
        pass
    i -= 1
    while line[i] != " ":
        pass
    i -= 1
    while line[i] != " ":
        ties = line[i] + ties
        i -= 1
    current_array.insert(0, ties)
    i -= 1
    while line[i] != " ":
        losses = line[i] + losses
        i -= 1
    current_array.insert(0, losses)
    i -= 1
    while line[i] != " ":
        wins = line[i] + wins
        i -= 1
    current_array.insert(0, wins)
    i -= 1
    print(current_array)

    total_array.append(current_array)

    current_array = []