#Kitchen Objects

import sys
from PySide6.QtWidgets import QApplication, QGraphicsScene, QGraphicsView, QGraphicsRectItem
from PySide6.QtCore import QRectF

class KitchenObject(QGraphicsRectItem):
    def __init__(self, rect, x, y):
        super().__init__(rect)
        self.x = x
        self.y = y


    def movePos():
        