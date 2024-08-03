import sys
from PySide6.QtWidgets import QApplication, QGraphicsScene, QGraphicsView, QGraphicsRectItem
from PySide6.QtCore import QRectF, QTimer

class MovingRect(QGraphicsRectItem):
    def __init__(self, rect, dx, dy):
        super().__init__(rect)
        self.dx = dx
        self.dy = dy

    def advance(self):
        self.moveBy(self.dx, self.dy)
        # Check for collision with other items
        colliding_items = self.collidingItems()


class MyView(QGraphicsView):
    def __init__(self):
        super().__init__()
        self.scene = QGraphicsScene()
        self.setScene(self.scene)

        # Create two moving rectangles
        self.rect1 = MovingRect(QRectF(0, 0, 50, 50), 1, 1)
        self.rect2 = MovingRect(QRectF(100, 100, 50, 50), -1, -1)
        
        
        self.scene.addItem(self.rect1)
        self.scene.addItem(self.rect2)

        self.timer = QTimer()
        self.timer.timeout.connect(self.advance)
        self.timer.start(16)  # roughly 60 frames per second

    def advance(self):
        self.rect1.advance()
        self.rect2.advance()

if __name__ == "__main__":
    app = QApplication(sys.argv)
    view = MyView()
    view.show()
    sys.exit(app.exec_())