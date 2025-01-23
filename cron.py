import modal
app = modal.App("nonnas-recipes")

@app.function(schedule=modal.Period(hours=1))
def translate():
    print("Completed performing translations!")
