const  ShcemaCridetCard=db=>
{
    db.serialize(() => {
        db.run(`CREATE TABLE Credit (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        CardName TEXT,
        CardNumber INT(19),
        CardBalance  DECIMAL DEFAULT 0)`);
    });
}
module.exports= ShcemaCridetCard;

